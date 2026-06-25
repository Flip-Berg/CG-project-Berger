var teximg = [];
var texSrc = ["grailed.png"];
var loadTexs = 0;
var gl;
var prog;
var camPos = [5, 5, 5];


var angle = 0;

function getGL(canvas)
{
    var gl = canvas.getContext("webgl");
    if(gl) return gl;
    
    gl = canvas.getContext("experimental-webgl");
    if(gl) return gl;
    
    alert("Contexto WebGL inexistente! Troque de navegador!");
    return false;
}

function createShader(gl, shaderType, shaderSrc)
{
	var shader = gl.createShader(shaderType);
	gl.shaderSource(shader, shaderSrc);
	gl.compileShader(shader);
	
	if(gl.getShaderParameter(shader, gl.COMPILE_STATUS))
		return shader;
	
	alert("Erro de compilação: " + gl.getShaderInfoLog(shader));
	
	gl.deleteShader(shader);
}

function createProgram(gl, vtxShader, fragShader)
{
	var prog = gl.createProgram();
	gl.attachShader(prog, vtxShader);
	gl.attachShader(prog, fragShader);
	gl.linkProgram(prog);
	
	if(gl.getProgramParameter(prog, gl.LINK_STATUS))
		return prog;

    alert("Erro de linkagem: " + gl.getProgramInfoLog(prog));
	
	gl.deleteProgram(prog);	
}

function init()
{
    for(i = 0; i < texSrc.length; i++)
    {
        teximg[i] = new Image();
        teximg[i].src = texSrc[i];
        teximg[i].onload = function()
        {
            loadTexs++;
    	    loadTextures();
        }
    }
}

function loadTextures()
{
    if(loadTexs == texSrc.length)
    {
       initGL();
       configScene();
       requestAnimationFrame(gameLoop);
    }
}

var uniformPtrs = {};

function cacheUniforms() {
    uniformPtrs.lightPos  = gl.getUniformLocation(prog, "lightPos");
    uniformPtrs.camPos    = gl.getUniformLocation(prog, "camPos");
    uniformPtrs.transfproj = gl.getUniformLocation(prog, "transfproj");
    uniformPtrs.transf    = gl.getUniformLocation(prog, "transf");
    uniformPtrs.useTexture = gl.getUniformLocation(prog, "useTexture");
    uniformPtrs.solidColor = gl.getUniformLocation(prog, "solidColor");
    uniformPtrs.tex       = gl.getUniformLocation(prog, "tex");
    uniformPtrs.lightDirection = gl.getUniformLocation(prog, "lightDirection");
    uniformPtrs.lightColor     = gl.getUniformLocation(prog, "lightColor");
    uniformPtrs.position = gl.getAttribLocation(prog, "position");
    uniformPtrs.texCoord = gl.getAttribLocation(prog, "texCoord");
    uniformPtrs.normal   = gl.getAttribLocation(prog, "normal");
}

function initGL()
{

	var canvas = document.getElementById("glcanvas1");
	
	gl = getGL(canvas);
	if(gl)
	{
        //Inicializa shaders
 		var vtxShSrc = document.getElementById("vertex-shader").text;
		var fragShSrc = document.getElementById("frag-shader").text;

        var vtxShader = createShader(gl, gl.VERTEX_SHADER, vtxShSrc);
        var fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShSrc);
        prog = createProgram(gl, vtxShader, fragShader);	
        
        gl.useProgram(prog);

        

        cacheUniforms();

        //Inicializa área de desenho: viewport e cor de limpeza; limpa a tela
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 1);
        gl.enable( gl.BLEND );
        gl.blendFunc( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA );
        gl.enable(gl.DEPTH_TEST);
        //gl.enable(gl.CULL_FACE);

    }

    
}    

function createBufferObject(verts, normals, useTexture, texture, color, modelMatrix) {
    // verts: Float32Array intercalado [x,y,z,u,v, x,y,z,u,v, ...]
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    var normalBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuf);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

    return {
        buffer: buf,
        normalBuffer: normalBuf,
        vertexCount: verts.length / 5, // 5 floats por vértice (x,y,z,u,v)
        useTexture: useTexture,
        texture: texture || null,
        color: color || [1, 1, 1],
        modelMatrix: modelMatrix
    };
}

var sceneObjects = [];
var trackLength = 40;
var laneX = [-3, -1, 1, 3];
var trackColors = [
    [0.1, 0.4, 1.0],   // azul
    [0.1, 1.0, 0.2],   // verde
    [0.55, 0.1, 0.9],  // roxo
    [1.0, 0.15, 0.15]  // vermelho
];

function createTextureFromImage(img) {
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    return tex;
}

function configScene()
{
    // ---- Geometria reaproveitável ----

    // Quad deitado no plano XZ, normal pra cima (+Y) -> usado pelas trilhas
    var laneQuadVerts = new Float32Array([
        -0.5, 0,  0.5,  0, 0,
        -0.5, 0, -0.5,  0, 1,
         0.5, 0, -0.5,  1, 1,
        -0.5, 0,  0.5,  0, 0,
         0.5, 0, -0.5,  1, 1,
         0.5, 0,  0.5,  1, 0
    ]);
    var laneQuadNormals = new Float32Array([
        0,1,0,  0,1,0,  0,1,0,
        0,1,0,  0,1,0,  0,1,0
    ]);

    // Quad vertical no plano XY, normal pra frente (+Z) -> usado pelo fundo
    var bgQuadVerts = new Float32Array([
        -0.5,  0.5, 0,  0, 0,
        -0.5, -0.5, 0,  0, 1,
         0.5, -0.5, 0,  1, 1,
        -0.5,  0.5, 0,  0, 0,
         0.5, -0.5, 0,  1, 1,
         0.5,  0.5, 0,  1, 0
    ]);
    var bgQuadNormals = new Float32Array([
        0,0,1,  0,0,1,  0,0,1,
        0,0,1,  0,0,1,  0,0,1
    ]);

    // ---- 4 trilhas ----
    for (var i = 0; i < 4; i++) {
        var laneMatrix = math.matrix([
            [1.2, 0, 0, laneX[i]],
            [0, 1, 0, 0],
            [0, 0, trackLength, -trackLength/2],
            [0, 0, 0, 1]
        ]);
        var laneObj = createBufferObject(
            laneQuadVerts, laneQuadNormals,
            false,              // useTexture
            null,               // texture
            trackColors[i],     // color
            laneMatrix
        );
        addSceneObject(laneObj);
    }

    // ---- Fundo com capa do álbum ----
    var capaTexture = createTextureFromImage(teximg[0]); // teximg[0] = capa carregada em init()

    var bgMatrix = math.matrix([
        [40, 0, 0, 0],
        [0, 20, 0, 4],
        [0, 0, 1, -trackLength - 5],
        [0, 0, 0, 1]
    ]);
    var bgObj = createBufferObject(
        bgQuadVerts, bgQuadNormals,
        true,           // useTexture
        capaTexture,
        [1, 1, 1],      // color (ignorado quando useTexture=true)
        bgMatrix
    );
    addSceneObject(bgObj);

    // ---- Iluminação (igual ao código antigo, fica fora do loop de objetos) ----
    gl.uniform3fv(uniformPtrs.lightDirection, [0, -1, -0.5]);

    gl.uniform3fv(uniformPtrs.lightColor, [1, 1, 1]);

    gl.uniform3fv(uniformPtrs.lightPos, [0, 5, -5]);

    //para notas
    initNoteBuffers();

    setLaneOBJ(3, './objs/12190_Heart_v1_L3.obj', 
        {
        scale:    [-0.07, -0.07, -0.07], //negativo para refletir
        rotation: [90, 0, 0]          // graus: inclina o coração de frente
        },
        function(n, base) { return animPulse(n, base, 0.8, 1.2, 3.0); }
    );

    setLaneOBJ(2, './objs/18366_Hinduism-Lotus_Flower_V1.obj', {
        scale:    [-0.3, -0.3, -0.3],
        rotation: [90, 0, 0]          // graus: inclina o coração de frente
        },
        function(n, base) { return animSpin(n, base, 1, 1.8); }
    );

    setLaneOBJ(1, './objs/13517_Beach_Ball_v2_L3.obj', {
        scale:    [-0.05, -0.05, -0.05],
        rotation: [90, 0, 0]          // graus: inclina o coração de frente
        }, 
        function(n, base) { return animBounce(n, base, 2, 4.0); }
    );

    setLaneOBJ(0, './objs/19340_Star_v1.obj', {
        scale:    [-0.5, -0.5, -0.5],
        rotation: [90, 0, 0]          // graus: inclina o coração de frente
        },
        function(n, base) { return animSpin(n, base, 2, 2.5); }
    );

    Audio.init('./audio/1nonly - GRAILED (feat. Freddie Dredd).mp3', {
        musicVolume: 0.6,   // volume da música (0..1)
        sfxVolume:   0.2,   // volume dos sons de hit/miss (0..1)
        hitAll:  './audio/hit.mp3',
        missAll: './audio/miss.mp3',
        // por lane (opcional, sobrescreve hitAll):
        // hitSounds:  { 0: './audio/hit_estrela.mp3' },
        // missSounds: { 2: './audio/miss_lotus.mp3'  }
    });

    // ---- Faixa de hit zone ----
    var hitZoneVerts = new Float32Array([
        -0.5, 0.01,  0.5,  0, 0,
        -0.5, 0.01, -0.5,  0, 1,
        0.5, 0.01, -0.5,  1, 1,
        -0.5, 0.01,  0.5,  0, 0,
        0.5, 0.01, -0.5,  1, 1,
        0.5, 0.01,  0.5,  1, 0
    ]);
    var hitZoneNormals = new Float32Array([
        0,1,0, 0,1,0, 0,1,0,
        0,1,0, 0,1,0, 0,1,0
    ]);

    // largura total cobre as 4 trilhas (laneX vai de -3 a 3, mais a meia-largura de cada)
    var hitZoneMatrix = math.matrix([
        [9.0, 0, 0, 0],        // largura: cobre tudo
        [0,   1, 0, 0],
        [0,   0, HIT_WINDOW, HIT_ZONE_Z],  // espessura fina em Z, posicionada na hit zone
        [0,   0, 0, 1]
    ]);
    addSceneObject(createBufferObject(
        hitZoneVerts, hitZoneNormals,
        false, null,
        [1.0, 1.0, 1.0],   // branco
        hitZoneMatrix
    ));
}

function addSceneObject(obj) {
    sceneObjects.push(obj);
}

function createPerspective(fovy, aspect, near, far)
{
    fovy = fovy*Math.PI/180.0;

    var fy = 1/math.tan(fovy/2.0);
    var fx = fy/aspect;
    var B = -2*far*near/(far-near);
    var A = -(far+near)/(far-near);

	var proj = math.matrix(
							[[ fx, 0.0,  0.0, 0.0],
							 [0.0,  fy,  0.0, 0.0],
							 [0.0, 0.0,    A,   B],
							 [0.0, 0.0, -1.0, 0.0]]
							);
							
	return proj;
}

function createCamera(pos, target, up)
{  
  var zc = math.subtract(pos, target);
  zc = math.divide(zc, math.norm(zc));
  
  var yt = math.subtract(up, pos);
  yt = math.divide(yt, math.norm(yt));
  
  var xc = math.cross(yt, zc);
  xc = math.divide(xc, math.norm(xc));
  
  var yc = math.cross(zc, xc);
  yc = math.divide(yc,math.norm(yc));
  
  var mt = math.inv(math.transpose(math.matrix([xc,yc,zc])));
  
  mt = math.resize(mt, [4,4], 0);
  mt._data[3][3] = 1;
  
  var mov = math.matrix([[1, 0, 0, -pos[0]], 
                         [0, 1, 0, -pos[1]],
                         [0, 0, 1, -pos[2]],
                         [0, 0, 0, 1]]);
  
  var cam = math.multiply(mt, mov);
  
  return cam;
}              

var cameraAngles = [
    { pos: [0, 2.5, 5],  target: [0, 0.5, -10] }, //frente
    { pos: [6, 4, 0],    target: [0, 0, -10] }, //três quartos
    { pos: [0, 10, 0],  target: [0, 0, -5] } //cima
];

var camState = {
    from: cameraAngles[0],
    to: cameraAngles[0],
    t: 1,
    duration: 2.0,
    nextSwitchAt: 5.0
};

function easeInOut(t) {
    return t*t*(3 - 2*t);
}

function lerpVec3(a, b, t) {
    return [
        a[0] + (b[0]-a[0])*t,
        a[1] + (b[1]-a[1])*t,
        a[2] + (b[2]-a[2])*t
    ];
}

function updateCamera(dt) {
    camState.nextSwitchAt -= dt;
    if (camState.nextSwitchAt <= 0 && camState.t >= 1) {
        camState.from = camState.to;
        var nextIndex = (cameraAngles.indexOf(camState.to) + 1) % cameraAngles.length;
        camState.to = cameraAngles[nextIndex];
        camState.t = 0;
        camState.nextSwitchAt = 5.0;
    }
    if (camState.t < 1) {
        camState.t = Math.min(camState.t + dt/camState.duration, 1);
    }

    var e = easeInOut(camState.t);
    var pos = lerpVec3(camState.from.pos, camState.to.pos, e);
    var target = lerpVec3(camState.from.target, camState.to.target, e);
    return createCamera(pos, target, [pos[0], pos[1]+1, pos[2]]);
}

function drawObject(obj, transfprojMatrix, transfMatrix)
{
    // ---- Posição + UV (vêm do mesmo buffer intercalado) ----
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);

    gl.enableVertexAttribArray(uniformPtrs.position);
    gl.vertexAttribPointer(uniformPtrs.position, 3, gl.FLOAT, false, 5*4, 0);

    gl.enableVertexAttribArray(uniformPtrs.texCoord);
    gl.vertexAttribPointer(uniformPtrs.texCoord, 2, gl.FLOAT, false, 5*4, 3*4);

    // ---- Normais (buffer separado) ----
    gl.bindBuffer(gl.ARRAY_BUFFER, obj.normalBuffer);

    gl.enableVertexAttribArray(uniformPtrs.normal);
    gl.vertexAttribPointer(uniformPtrs.normal, 3, gl.FLOAT, false, 0, 0);
    
    // ---- Matrizes (posição final do objeto na cena) ----
    var modelTransfproj = math.multiply(transfprojMatrix, obj.modelMatrix);
    var modelTransf = math.multiply(transfMatrix, obj.modelMatrix);

    var flatTransfproj = math.flatten(math.transpose(modelTransfproj))._data;
    gl.uniformMatrix4fv(uniformPtrs.transfproj, false, flatTransfproj);

    var flatTransf = math.flatten(math.transpose(modelTransf))._data;
    gl.uniformMatrix4fv(uniformPtrs.transf, false, flatTransf);

    // ---- Textura ou cor sólida ----
    gl.uniform1i(uniformPtrs.useTexture, obj.useTexture ? 1 : 0);

    if (obj.useTexture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, obj.texture);
        gl.uniform1i(uniformPtrs.tex, 0);
    } else {
        gl.uniform3fv(uniformPtrs.solidColor, obj.color);
    }

    // ---- Desenha ----
    gl.drawArrays(gl.TRIANGLES, 0, obj.vertexCount);
}

var lastTime = 0;

function gameLoop(timestamp)
{
    if (!lastTime) lastTime = timestamp;
    var dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    if (dt > 0.1) dt = 0.1; // evita salto grande (aba em background, lag)

    //incrementa tempo do jogo para definir quando gerar notas e trocar câmera
    gameTime += dt; 

    // ---- Atualiza câmera (transição entre ângulos) ----
    var cam = updateCamera(dt);

   // Atualiza luz e câmera juntas
    var camPos = lerpVec3(camState.from.pos, camState.to.pos, easeInOut(camState.t));

    var lightPosPtr = uniformPtrs.lightPos;
    gl.uniform3fv(lightPosPtr, [camPos[0], camPos[1] + 3, camPos[2]]);

    var camPosPtr = uniformPtrs.camPos;
    gl.uniform3fv(camPosPtr, camPos);

    // ---- Projeção (recalculada caso o canvas mude de tamanho) ----
    var mproj = createPerspective(45, gl.canvas.width/gl.canvas.height, 0.1, 100);
    var transfproj = math.multiply(mproj, cam);

    //atualiza posição das notas e checa acertos/falhas
    updateNotes(dt); 

    // ---- Limpa a tela ----
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // ---- Desenha cada objeto da cena ----
    for (var i = 0; i < sceneObjects.length; i++) {
        drawObject(sceneObjects[i], transfproj, cam);
    }

    //desenha notas atualizadas
    drawNotes(transfproj, cam);

    requestAnimationFrame(gameLoop);
}
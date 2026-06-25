// objloader.js
// Lê o formato OBJ (v, vn, f com índices v/vt/vn ou v//vn)
// Suporta triângulos e quads (quad é dividido em 2 triângulos)
// Retorna { verts: Float32Array, normals: Float32Array, vertexCount: number }
// verts: intercalado [x,y,z, u,v,  x,y,z, u,v, ...]  (u,v = 0 pois não usa textura)

function parseOBJ(text) {
    var positions = [];   // [ [x,y,z], ... ]
    var normals_src = []; // [ [nx,ny,nz], ... ]

    var outVerts   = [];  // saída: x,y,z,u,v por vértice
    var outNormals = [];  // saída: nx,ny,nz por vértice

    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line === '' || line[0] === '#') continue;

        var parts = line.split(/\s+/);
        var token = parts[0];

        if (token === 'v') {
            positions.push([
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            ]);
        } else if (token === 'vn') {
            normals_src.push([
                parseFloat(parts[1]),
                parseFloat(parts[2]),
                parseFloat(parts[3])
            ]);
        } else if (token === 'f') {
            // coleta todos os vértices da face (pode ser tri ou quad)
            var faceVerts = [];
            for (var k = 1; k < parts.length; k++) {
                if (parts[k] === '') continue;
                var indices = parts[k].split('/');
                var vi  = parseInt(indices[0]) - 1;   // índice de posição (1-based)
                var vni = parseInt(indices[2]) - 1;   // índice de normal  (1-based)

                faceVerts.push({ vi: vi, vni: vni });
            }

            // Triangula a face com fan (funciona para tri e quad)
            for (var t = 1; t < faceVerts.length - 1; t++) {
                var tri = [ faceVerts[0], faceVerts[t], faceVerts[t+1] ];
                for (var j = 0; j < 3; j++) {
                    var p = positions[tri[j].vi];
                    var n = normals_src[tri[j].vni];
                    outVerts.push(p[0], p[1], p[2], 0, 0);
                    outNormals.push(n[0], n[1], n[2]);
                }
            }
        }
    }

    return {
        verts:       new Float32Array(outVerts),
        normals:     new Float32Array(outNormals),
        vertexCount: outVerts.length / 5
    };
}

// Carrega o OBJ via fetch e cria os buffers WebGL
// objPath: caminho para o arquivo .obj
// callback(bufferObj): chamado quando pronto
//   bufferObj = { buffer, normalBuffer, vertexCount }
function loadOBJ(objPath, callback) {
    fetch(objPath)
        .then(function(r) { return r.text(); })
        .then(function(text) {
            var parsed = parseOBJ(text);

            var buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, parsed.verts, gl.STATIC_DRAW);

            var normalBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normalBuf);
            gl.bufferData(gl.ARRAY_BUFFER, parsed.normals, gl.STATIC_DRAW);

            callback({
                buffer:       buf,
                normalBuffer: normalBuf,
                vertexCount:  parsed.vertexCount
            });
        });
}

// transform: { scale: [sx,sy,sz], rotation: [rx,ry,rz] } (rotação em graus, opcional)
function setLaneOBJ(lane, objPath, transform, anim) {
    var t = transform || {};
    laneOBJ[lane] = {
        bufObj: null,
        scale:    t.scale    || [1, 1, 1],
        rotation: t.rotation || [0, 0, 0],
        anim: anim || null
    };
    loadOBJ(objPath, function(bufObj) {
        laneOBJ[lane].bufObj = bufObj;
    });
}
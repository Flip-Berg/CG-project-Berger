var notes = []; // notas ativas na cena
var chart = [
 
    // =============================================
    // INTRO (0s – 16s) — apresenta uma lane de cada vez
    // =============================================
    { lane: 0, time:  1.0 },
    { lane: 0, time:  2.0 },
    { lane: 0, time:  3.0 },
    { lane: 0, time:  4.0 },
 
    { lane: 1, time:  5.0 },
    { lane: 1, time:  6.0 },
    { lane: 1, time:  7.0 },
    { lane: 1, time:  8.0 },
 
    { lane: 2, time:  9.0 },
    { lane: 2, time: 10.0 },
    { lane: 2, time: 11.0 },
    { lane: 2, time: 12.0 },
 
    { lane: 3, time: 13.0 },
    { lane: 3, time: 14.0 },
    { lane: 3, time: 15.0 },
    { lane: 3, time: 16.0 },
 
    // =============================================
    // SEÇÃO A (16s – 36s) — padrão alternado simples
    // =============================================
    { lane: 0, time: 17.0 },
    { lane: 2, time: 17.5 },
    { lane: 1, time: 18.0 },
    { lane: 3, time: 18.5 },
    { lane: 0, time: 19.0 },
    { lane: 2, time: 19.5 },
    { lane: 1, time: 20.0 },
    { lane: 3, time: 20.5 },
 
    { lane: 0, time: 21.0 },
    { lane: 1, time: 21.0 },
    { lane: 2, time: 22.0 },
    { lane: 3, time: 22.0 },
    { lane: 0, time: 23.0 },
    { lane: 1, time: 23.0 },
    { lane: 2, time: 24.0 },
    { lane: 3, time: 24.0 },
 
    { lane: 0, time: 25.0 },
    { lane: 2, time: 25.5 },
    { lane: 1, time: 26.0 },
    { lane: 3, time: 26.5 },
    { lane: 0, time: 27.0 },
    { lane: 2, time: 27.5 },
    { lane: 1, time: 28.0 },
    { lane: 3, time: 28.5 },
 
    { lane: 0, time: 29.0 },
    { lane: 1, time: 29.5 },
    { lane: 2, time: 30.0 },
    { lane: 3, time: 30.5 },
    { lane: 3, time: 31.0 },
    { lane: 2, time: 31.5 },
    { lane: 1, time: 32.0 },
    { lane: 0, time: 32.5 },
 
    { lane: 0, time: 33.0 },
    { lane: 1, time: 33.0 },
    { lane: 2, time: 33.0 },
    { lane: 3, time: 33.0 },
 
    { lane: 0, time: 35.0 },
    { lane: 3, time: 35.5 },
 
    // =============================================
    // SEÇÃO B (36s – 60s) — colcheia densa, duplas
    // =============================================
    { lane: 0, time: 37.0 },
    { lane: 1, time: 37.25 },
    { lane: 2, time: 37.5 },
    { lane: 3, time: 37.75 },
    { lane: 2, time: 38.0 },
    { lane: 1, time: 38.25 },
    { lane: 0, time: 38.5 },
    { lane: 1, time: 38.75 },
 
    { lane: 2, time: 39.0 },
    { lane: 3, time: 39.25 },
    { lane: 2, time: 39.5 },
    { lane: 3, time: 39.75 },
    { lane: 0, time: 40.0 },
    { lane: 1, time: 40.0 },
    { lane: 2, time: 40.5 },
    { lane: 3, time: 40.5 },
 
    { lane: 0, time: 41.0 },
    { lane: 2, time: 41.0 },
    { lane: 1, time: 41.5 },
    { lane: 3, time: 41.5 },
    { lane: 0, time: 42.0 },
    { lane: 1, time: 42.25 },
    { lane: 2, time: 42.5 },
    { lane: 3, time: 42.75 },
 
    { lane: 0, time: 43.0 },
    { lane: 0, time: 43.5 },
    { lane: 1, time: 44.0 },
    { lane: 1, time: 44.5 },
    { lane: 2, time: 45.0 },
    { lane: 2, time: 45.5 },
    { lane: 3, time: 46.0 },
    { lane: 3, time: 46.5 },
 
    { lane: 0, time: 47.0 },
    { lane: 1, time: 47.25 },
    { lane: 2, time: 47.5 },
    { lane: 3, time: 47.75 },
    { lane: 0, time: 48.0 },
    { lane: 3, time: 48.0 },
    { lane: 1, time: 48.5 },
    { lane: 2, time: 48.5 },
 
    { lane: 0, time: 49.0 },
    { lane: 1, time: 49.0 },
    { lane: 2, time: 49.0 },
    { lane: 3, time: 49.0 },
 
    { lane: 0, time: 50.0 },
    { lane: 2, time: 50.5 },
    { lane: 1, time: 51.0 },
    { lane: 3, time: 51.5 },
    { lane: 0, time: 52.0 },
    { lane: 2, time: 52.5 },
    { lane: 1, time: 53.0 },
    { lane: 3, time: 53.5 },
 
    { lane: 0, time: 54.0 },
    { lane: 1, time: 54.0 },
    { lane: 2, time: 55.0 },
    { lane: 3, time: 55.0 },
    { lane: 0, time: 56.0 },
    { lane: 3, time: 56.0 },
    { lane: 1, time: 57.0 },
    { lane: 2, time: 57.0 },
 
    { lane: 0, time: 58.0 },
    { lane: 1, time: 58.25 },
    { lane: 2, time: 58.5 },
    { lane: 3, time: 58.75 },
    { lane: 0, time: 59.0 },
    { lane: 1, time: 59.0 },
    { lane: 2, time: 59.0 },
    { lane: 3, time: 59.0 },
 
    // =============================================
    // BREAK (60s – 72s) — respiro, notas esparsas
    // =============================================
    { lane: 0, time: 61.0 },
    { lane: 3, time: 63.0 },
    { lane: 1, time: 65.0 },
    { lane: 2, time: 67.0 },
    { lane: 0, time: 69.0 },
    { lane: 3, time: 71.0 },
 
    // =============================================
    // SEÇÃO C (72s – 100s) — galope: triplets e runs
    // =============================================
    { lane: 0, time: 73.0 },
    { lane: 1, time: 73.33 },
    { lane: 2, time: 73.66 },
    { lane: 0, time: 74.0 },
    { lane: 1, time: 74.33 },
    { lane: 2, time: 74.66 },
    { lane: 3, time: 75.0 },
    { lane: 2, time: 75.33 },
    { lane: 1, time: 75.66 },
 
    { lane: 0, time: 76.0 },
    { lane: 0, time: 76.5 },
    { lane: 1, time: 77.0 },
    { lane: 1, time: 77.5 },
    { lane: 2, time: 78.0 },
    { lane: 3, time: 78.0 },
    { lane: 2, time: 78.5 },
    { lane: 3, time: 78.5 },
 
    { lane: 0, time: 79.0 },
    { lane: 1, time: 79.25 },
    { lane: 2, time: 79.5 },
    { lane: 3, time: 79.75 },
    { lane: 2, time: 80.0 },
    { lane: 1, time: 80.25 },
    { lane: 0, time: 80.5 },
    { lane: 1, time: 80.75 },
    { lane: 2, time: 81.0 },
    { lane: 3, time: 81.25 },
 
    { lane: 0, time: 82.0 },
    { lane: 1, time: 82.0 },
    { lane: 2, time: 82.0 },
    { lane: 3, time: 82.0 },
    { lane: 0, time: 83.0 },
    { lane: 2, time: 83.5 },
    { lane: 1, time: 84.0 },
    { lane: 3, time: 84.5 },
 
    { lane: 3, time: 85.0 },
    { lane: 2, time: 85.33 },
    { lane: 1, time: 85.66 },
    { lane: 0, time: 86.0 },
    { lane: 1, time: 86.33 },
    { lane: 2, time: 86.66 },
    { lane: 3, time: 87.0 },
    { lane: 2, time: 87.33 },
    { lane: 1, time: 87.66 },
    { lane: 0, time: 88.0 },
 
    { lane: 0, time: 89.0 },
    { lane: 1, time: 89.0 },
    { lane: 2, time: 89.5 },
    { lane: 3, time: 89.5 },
    { lane: 0, time: 90.0 },
    { lane: 3, time: 90.0 },
    { lane: 1, time: 90.5 },
    { lane: 2, time: 90.5 },
 
    { lane: 0, time: 91.0 },
    { lane: 1, time: 91.25 },
    { lane: 2, time: 91.5 },
    { lane: 3, time: 91.75 },
    { lane: 0, time: 92.0 },
    { lane: 1, time: 92.25 },
    { lane: 2, time: 92.5 },
    { lane: 3, time: 92.75 },
 
    { lane: 0, time: 93.0 },
    { lane: 0, time: 93.25 },
    { lane: 1, time: 93.5 },
    { lane: 1, time: 93.75 },
    { lane: 2, time: 94.0 },
    { lane: 2, time: 94.25 },
    { lane: 3, time: 94.5 },
    { lane: 3, time: 94.75 },
 
    { lane: 0, time: 95.0 },
    { lane: 1, time: 95.0 },
    { lane: 2, time: 95.0 },
    { lane: 3, time: 95.0 },
 
    { lane: 0, time: 96.0 },
    { lane: 2, time: 96.33 },
    { lane: 1, time: 96.66 },
    { lane: 3, time: 97.0 },
    { lane: 0, time: 97.33 },
    { lane: 2, time: 97.66 },
    { lane: 1, time: 98.0 },
    { lane: 3, time: 98.33 },
    { lane: 0, time: 98.66 },
    { lane: 1, time: 99.0 },
    { lane: 2, time: 99.0 },
    { lane: 3, time: 99.0 },
 
    // =============================================
    // BREAK 2 (100s – 110s) — muito esparso
    // =============================================
    { lane: 1, time: 101.0 },
    { lane: 2, time: 103.5 },
    { lane: 0, time: 106.0 },
    { lane: 3, time: 108.5 },
 
    // =============================================
    // CLÍMAX (110s – 135s) — máxima densidade
    // =============================================
    { lane: 0, time: 111.0 },
    { lane: 1, time: 111.25 },
    { lane: 2, time: 111.5 },
    { lane: 3, time: 111.75 },
    { lane: 0, time: 112.0 },
    { lane: 1, time: 112.0 },
    { lane: 2, time: 112.25 },
    { lane: 3, time: 112.25 },
    { lane: 0, time: 112.5 },
    { lane: 1, time: 112.75 },
    { lane: 2, time: 113.0 },
    { lane: 3, time: 113.25 },
 
    { lane: 0, time: 114.0 },
    { lane: 2, time: 114.0 },
    { lane: 1, time: 114.5 },
    { lane: 3, time: 114.5 },
    { lane: 0, time: 115.0 },
    { lane: 1, time: 115.0 },
    { lane: 2, time: 115.0 },
    { lane: 3, time: 115.0 },
 
    { lane: 0, time: 116.0 },
    { lane: 1, time: 116.2 },
    { lane: 2, time: 116.4 },
    { lane: 3, time: 116.6 },
    { lane: 2, time: 116.8 },
    { lane: 1, time: 117.0 },
    { lane: 0, time: 117.2 },
    { lane: 1, time: 117.4 },
    { lane: 2, time: 117.6 },
    { lane: 3, time: 117.8 },
 
    { lane: 0, time: 118.0 },
    { lane: 0, time: 118.25 },
    { lane: 1, time: 118.5 },
    { lane: 1, time: 118.75 },
    { lane: 2, time: 119.0 },
    { lane: 2, time: 119.25 },
    { lane: 3, time: 119.5 },
    { lane: 3, time: 119.75 },
    { lane: 0, time: 120.0 },
    { lane: 1, time: 120.0 },
    { lane: 2, time: 120.0 },
    { lane: 3, time: 120.0 },
 
    { lane: 0, time: 121.0 },
    { lane: 1, time: 121.25 },
    { lane: 0, time: 121.5 },
    { lane: 2, time: 121.75 },
    { lane: 3, time: 122.0 },
    { lane: 2, time: 122.25 },
    { lane: 1, time: 122.5 },
    { lane: 0, time: 122.75 },
 
    { lane: 3, time: 123.0 },
    { lane: 2, time: 123.0 },
    { lane: 1, time: 123.5 },
    { lane: 0, time: 123.5 },
    { lane: 3, time: 124.0 },
    { lane: 1, time: 124.0 },
    { lane: 2, time: 124.5 },
    { lane: 0, time: 124.5 },
 
    { lane: 0, time: 125.0 },
    { lane: 1, time: 125.2 },
    { lane: 2, time: 125.4 },
    { lane: 3, time: 125.6 },
    { lane: 0, time: 125.8 },
    { lane: 1, time: 126.0 },
    { lane: 2, time: 126.2 },
    { lane: 3, time: 126.4 },
    { lane: 0, time: 126.6 },
    { lane: 1, time: 126.8 },
    { lane: 2, time: 127.0 },
    { lane: 3, time: 127.0 },
 
    { lane: 0, time: 127.5 },
    { lane: 1, time: 127.5 },
    { lane: 2, time: 128.0 },
    { lane: 3, time: 128.0 },
    { lane: 0, time: 128.5 },
    { lane: 3, time: 128.5 },
    { lane: 1, time: 129.0 },
    { lane: 2, time: 129.0 },
 
    { lane: 0, time: 130.0 },
    { lane: 1, time: 130.25 },
    { lane: 2, time: 130.5 },
    { lane: 3, time: 130.75 },
    { lane: 0, time: 131.0 },
    { lane: 1, time: 131.0 },
    { lane: 2, time: 131.0 },
    { lane: 3, time: 131.0 },
 
    { lane: 0, time: 132.0 },
    { lane: 2, time: 132.25 },
    { lane: 1, time: 132.5 },
    { lane: 3, time: 132.75 },
    { lane: 0, time: 133.0 },
    { lane: 2, time: 133.25 },
    { lane: 1, time: 133.5 },
    { lane: 3, time: 133.75 },
 
    { lane: 0, time: 134.0 },
    { lane: 1, time: 134.0 },
    { lane: 2, time: 134.0 },
    { lane: 3, time: 134.0 },
 
    // =============================================
    // OUTRO (135s – 150s) — dissolve gradual
    // =============================================
    { lane: 0, time: 136.0 },
    { lane: 3, time: 137.0 },
    { lane: 1, time: 138.0 },
    { lane: 2, time: 139.0 },
 
    { lane: 0, time: 140.0 },
    { lane: 1, time: 140.5 },
    { lane: 2, time: 141.0 },
    { lane: 3, time: 141.5 },
 
    { lane: 0, time: 143.0 },
    { lane: 3, time: 144.0 },
    { lane: 1, time: 145.5 },
    { lane: 2, time: 147.0 },
 
    { lane: 0, time: 149.0 },
    { lane: 1, time: 149.0 },
    { lane: 2, time: 149.0 },
    { lane: 3, time: 149.0 },
];

var gameTime = 0;       // tempo acumulado desde o início do jogo
var chartIndex = 0;     // próxima nota do chart a spawnar
var score = 0;
var laneOBJ = {}; //lista de objetos carregados para cada trilha, para renderizar as bordas coloridas

var NOTE_SPEED = 8;     // unidades por segundo (quão rápido a nota desce)
var HIT_ZONE_Z = -5.0;   // posição Z da linha de acerto (perto da câmera)
var HIT_WINDOW = 0.8;   // margem de acerto em unidades de Z (±0.3)
var MISS_Z = 4.0;       // se passar daqui sem ser acertada, é miss



function spawnNote(lane) {
    notes.push({
        lane: lane,
        z: -40,              // começa no fundo da trilha (longe da câmera)
        alive: true,         // false quando acertada ou perdida
        hit: false
    });
}

function updateNotes(dt) {
    // Spawna notas conforme o tempo de jogo avança
    var currentTime = Audio.getMusicTime();
    while (chartIndex < chart.length && chart[chartIndex].time <= currentTime) {
        spawnNote(chart[chartIndex].lane);
        chartIndex++;
    }

    // Move cada nota em direção à câmera (+Z) e remove as que passaram
    for (var i = notes.length - 1; i >= 0; i--) {
        var n = notes[i];
        if (!n.alive) { notes.splice(i, 1); continue; }

        n.z += NOTE_SPEED * dt;

        // Passou da zona de acerto sem ser acertada = miss
        if (n.z > HIT_ZONE_Z + HIT_WINDOW) {
            n.alive = false;
            n.missed = true;      // marca para processar fora do loop
            n.missLane = n.lane;  // salva a lane antes do splice
        }
    }
    for (var i = notes.length - 1; i >= 0; i--) {
        var n = notes[i];
        if (n.missed) {
            var lane = n.missLane;
            notes.splice(i, 1);
            Audio.playMiss(lane);
            showFeedback(lane, false);
        }
    }
}

// Geometria da nota: quad vertical pequeno (encarando a câmera)
var noteVerts = new Float32Array([
    -0.4,  0.15, 0,  0, 0,
    -0.4, -0.15, 0,  0, 1,
     0.4, -0.15, 0,  1, 1,
    -0.4,  0.15, 0,  0, 0,
     0.4, -0.15, 0,  1, 1,
     0.4,  0.15, 0,  1, 0
]);
var noteNormals = new Float32Array([
    0,0,1, 0,0,1, 0,0,1,
    0,0,1, 0,0,1, 0,0,1
]);

// Chame isso no configScene pra criar os buffers uma vez
var noteBufferObj = {
    buffer: null,
    normalBuffer: null
};

function initNoteBuffers() {
    noteBufferObj.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, noteBufferObj.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, noteVerts, gl.STATIC_DRAW);

    noteBufferObj.normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, noteBufferObj.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, noteNormals, gl.STATIC_DRAW);
}

function lightenColor(c, t) {
    // mistura a cor com branco: resultado mais claro
    return [
        c[0] + (1.0 - c[0]) * t,
        c[1] + (1.0 - c[1]) * t,
        c[2] + (1.0 - c[2]) * t
    ];
}

function darkenColor(c, t) {
    return [c[0]*t, c[1]*t, c[2]*t];
}

// ---- Animação de notas ----
// Cada função recebe (n, baseTransform) e retorna { scale, rotation, offsetY }
// n: nota  |  baseTransform: { scale, rotation } definido no setLaneOBJ
// gameTime já existe no escopo global

function animSpin(n, base, axis, speed) {
    // Gira continuamente no eixo dado (0=X, 1=Y, 2=Z)
    var angle = gameTime * speed;
    var rot = base.rotation.slice();
    rot[axis] = (rot[axis] + angle * 180 / Math.PI) % 360;
    return { scale: base.scale, rotation: rot, offsetY: 0 };
}

function animBounce(n, base, height, speed) {
    // Quica em Y usando |sin|
    var offsetY = Math.abs(Math.sin(gameTime * speed)) * height;
    return { scale: base.scale, rotation: base.rotation, offsetY: offsetY };
}

function animPulse(n, base, minScale, maxScale, speed) {
    // Pulsa entre minScale e maxScale
    var t = (Math.sin(gameTime * speed) + 1) / 2; // 0..1
    var s = minScale + (maxScale - minScale) * t;
    var scale = [base.scale[0]*s, base.scale[1]*s, base.scale[2]*s];
    return { scale: scale, rotation: base.rotation, offsetY: 0 };
}

function drawNotes(transfproj, cam) {
    for (var i = 0; i < notes.length; i++) {
        var n = notes[i];
        if (!n.alive) continue;

        var noteBaseColor  = trackColors[n.lane];
        var noteLightColor = lightenColor(noteBaseColor, 0.1);
        var noteDarkColor = darkenColor(noteBaseColor, 0.6);
        var obj = laneOBJ[n.lane]; // mesh customizado para essa lane, se existir

        if (obj && obj.bufObj) {
            // Resolve animação ou usa base estática
            var anim = obj.anim
                ? obj.anim(n, { scale: obj.scale, rotation: obj.rotation })
                : { scale: obj.scale, rotation: obj.rotation, offsetY: 0 };

            var s  = anim.scale;
            var rx = anim.rotation[0] * Math.PI / 180;
            var ry = anim.rotation[1] * Math.PI / 180;
            var rz = anim.rotation[2] * Math.PI / 180;

            var Rx = math.matrix([
                [1,            0,             0, 0],
                [0,  Math.cos(rx), -Math.sin(rx), 0],
                [0,  Math.sin(rx),  Math.cos(rx), 0],
                [0,            0,             0, 1]
            ]);
            var Ry = math.matrix([
                [ Math.cos(ry), 0, Math.sin(ry), 0],
                [           0,  1,           0,  0],
                [-Math.sin(ry), 0, Math.cos(ry), 0],
                [           0,  0,           0,  1]
            ]);
            var Rz = math.matrix([
                [Math.cos(rz), -Math.sin(rz), 0, 0],
                [Math.sin(rz),  Math.cos(rz), 0, 0],
                [          0,             0,  1, 0],
                [          0,             0,  0, 1]
            ]);

            var S = math.matrix([
                [s[0], 0,    0,    0],
                [0,    s[1], 0,    0],
                [0,    0,    s[2], 0],
                [0,    0,    0,    1]
            ]);
            var Tr = math.matrix([
                [1, 0, 0, laneX[n.lane]     ],
                [0, 1, 0, 0.2 + anim.offsetY],
                [0, 0, 1, n.z               ],
                [0, 0, 0, 1                 ]
            ]);
            
            //ordem: escala, rotação, translação
            var noteMatrix = math.multiply(Tr, math.multiply(Ry, math.multiply(Rx, math.multiply(Rz, S))));

            drawObject({
                buffer:       obj.bufObj.buffer,
                normalBuffer: obj.bufObj.normalBuffer,
                vertexCount:  obj.bufObj.vertexCount,
                useTexture:   false,
                color:        noteBaseColor,
                modelMatrix:  noteMatrix,
                
            }, transfproj, cam);
        } else {
            // --- Quad padrão (trilhas sem OBJ) ---
            var borderMatrix = math.matrix([
                [1.1, 0, 0, laneX[n.lane]],
                [0,   1, 0, 0.11],
                [0,   0, 0.12, n.z],
                [0,   0, 0, 1]
            ]);
            drawObject({
                buffer: noteBufferObj.buffer,
                normalBuffer: noteBufferObj.normalBuffer,
                vertexCount: 6,
                useTexture: false,
                color: [1.0, 1.0, 1.0],
                modelMatrix: borderMatrix
            }, transfproj, cam);

            var noteMatrix = math.matrix([
                [0.9, 0, 0, laneX[n.lane]],
                [0,   1, 0, 0.11],
                [0,   0, 0.10, n.z],
                [0,   0, 0, 1]
            ]);
            drawObject({
                buffer: noteBufferObj.buffer,
                normalBuffer: noteBufferObj.normalBuffer,
                vertexCount: 6,
                useTexture: false,
                color: noteLightColor,
                modelMatrix: noteMatrix
            }, transfproj, cam);
        }
    }
}
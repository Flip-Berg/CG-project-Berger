var keysDown = {};  // teclas atualmente pressionadas

// Mapeamento: tecla → índice da trilha
var laneKeys = {
    'd': 0,  // azul
    'f': 1,  // verde
    'j': 2,  // branco
    'k': 3   // vermelho
};

window.addEventListener('keydown', function(e) {
    if (keysDown[e.key]) return;  // ignora repetição de tecla segurada
    keysDown[e.key] = true;

    var lane = laneKeys[e.key];
    if (lane === undefined) return;

    checkHit(lane);
});

window.addEventListener('keyup', function(e) {
    keysDown[e.key] = false;
});

function checkHit(lane) {
    Audio.start();  // desbloqueia áudio no primeiro input caso o browser tenha bloqueado


    var best = null;
    var bestDist = Infinity;

    // Procura a nota mais próxima da hit zone nessa trilha
    for (var i = 0; i < notes.length; i++) {
        var n = notes[i];
        if (!n.alive || n.hit || n.lane !== lane) continue;

        var dist = Math.abs(n.z - HIT_ZONE_Z);
        if (dist < HIT_WINDOW && dist < bestDist) {
            best = n;
            bestDist = dist;
        }
    }

    if (best) {
        best.alive = false;
        best.hit = true;
        score++;
        Audio.playHit(lane);
        showFeedback(lane, true);
    } else {
        score--;
        Audio.playMiss(lane);
        showFeedback(lane, false);  // pressionou fora do timing
    }
}

function showFeedback(lane, success) {
    document.getElementById('score-display').textContent = score;

    var el = document.getElementById('fb-' + lane);
    el.textContent = success ? '✓' : '✗';
    el.style.opacity = '1';
    el.style.color = success ? '#119231' : '#ff4444';

    clearTimeout(el._timer);
    el._timer = setTimeout(function() {
        el.style.opacity = '0';
    }, 400);
}
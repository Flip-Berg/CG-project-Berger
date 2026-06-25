// audio.js
// Gerencia música de fundo e sons de feedback (hit/miss por lane)
// Volumes de música e SFX são independentes
// A música tenta iniciar automaticamente; se bloqueada pelo browser,
// começa no primeiro input do jogador sem perder a sincronia de tempo.

var Audio = (function () {

    var ctx         = null;
    var bgSource    = null;   // AudioBufferSourceNode da música
    var bgBuffer    = null;   // AudioBuffer da música (decodificado)
    var bgGain      = null;   // GainNode da música
    var sfxGain     = null;   // GainNode dos efeitos
    var startedAt   = null;   // ctx.currentTime no momento do play
    var pausedAt    = 0;      // acumulado de tempo pausado (para retomar na posição certa)
    var musicVolume = 0.8;
    var sfxVolume   = 1.0;
    var started     = false;  // true após o primeiro play real
    var unlockBound = false;  // evita registrar o listener de unlock duas vezes

    // ---- sons carregados ----
    var hitBuffers  = {};   // { lane: AudioBuffer }
    var missBuffers = {};   // { lane: AudioBuffer }

    // ---- interno ----

    function getCtx() {
        if (!ctx) {
            ctx    = new (window.AudioContext || window.webkitAudioContext)();
            bgGain = ctx.createGain();
            bgGain.gain.value = musicVolume;
            bgGain.connect(ctx.destination);

            sfxGain = ctx.createGain();
            sfxGain.gain.value = sfxVolume;
            sfxGain.connect(ctx.destination);
        }
        return ctx;
    }

    function loadSound(path, callback) {
        fetch(path)
            .then(function (r) {
                if (!r.ok) throw new Error('HTTP ' + r.status + ' ao carregar ' + path);
                return r.arrayBuffer();
            })
            .then(function (buf) { return getCtx().decodeAudioData(buf); })
            .then(callback)
            .catch(function (e) { console.warn('[Audio] Falha ao carregar ' + path + ':', e); });
    }

    // Toca a música a partir de `offset` segundos
    function playMusicFrom(offset) {
        if (!bgBuffer) return;
        // para qualquer source anterior
        if (bgSource) { try { bgSource.stop(); } catch(e) {} }

        bgSource = getCtx().createBufferSource();
        bgSource.buffer = bgBuffer;
        bgSource.loop   = false;
        bgSource.connect(bgGain);
        bgSource.start(0, offset);
        startedAt = getCtx().currentTime - offset;
        started   = true;
    }

    // Registra listener para desbloquear áudio no primeiro input
    function registerUnlock() {
        if (unlockBound) return;
        unlockBound = true;

        function unlock() {
            getCtx().resume().then(function () {
                if (!started && bgBuffer) {
                    playMusicFrom(pausedAt);
                }
                document.removeEventListener('keydown', unlock);
                document.removeEventListener('click',  unlock);
                document.removeEventListener('touchstart', unlock);
            });
        }

        document.addEventListener('keydown',    unlock);
        document.addEventListener('click',      unlock);
        document.addEventListener('touchstart', unlock);
    }

    function playBuffer(buffer, vol) {
        if (!buffer) return;
        var c   = getCtx();
        var src = c.createBufferSource();
        src.buffer = buffer;
        src.connect(sfxGain);
        src.start(0);
    }

    // ---- API pública ----

    return {

        /**
         * Inicializa o sistema de áudio.
         * @param {string} musicPath  - Caminho do arquivo de música (mp3/ogg)
         * @param {object} options
         *   musicVolume  {number}  0..1  (padrão 0.8)
         *   sfxVolume    {number}  0..1  (padrão 1.0)
         *   hitAll       {string}  som genérico de acerto
         *   missAll      {string}  som genérico de erro
         *   hitSounds    {object}  { 0: 'path.mp3', 1: '...', ... } por lane
         *   missSounds   {object}  { 0: 'path.mp3', ... } por lane
         */
        init: function (musicPath, options) {
            var o = options || {};
            musicVolume = (o.musicVolume !== undefined) ? o.musicVolume : 0.8;
            sfxVolume   = (o.sfxVolume   !== undefined) ? o.sfxVolume   : 1.0;

            getCtx(); // garante que os GainNodes existem antes dos loads
            bgGain.gain.value  = musicVolume;
            sfxGain.gain.value = sfxVolume;

            // Carrega a música
            loadSound(musicPath, function (buf) {
                bgBuffer = buf;
                // Tenta tocar imediatamente
                if (getCtx().state === 'running') {
                    playMusicFrom(0);
                } else {
                    // Browser bloqueou — registra unlock para primeiro input
                    registerUnlock();
                }
            });

            // Sons de hit
            for (var lane = 0; lane < 4; lane++) {
                var hp = (o.hitSounds && o.hitSounds[lane])
                    ? o.hitSounds[lane]
                    : (o.hitAll || null);
                if (hp) (function (l, p) {
                    loadSound(p, function (buf) { hitBuffers[l] = buf; });
                })(lane, hp);
            }

            // Sons de miss
            for (var lane = 0; lane < 4; lane++) {
                var mp = (o.missSounds && o.missSounds[lane])
                    ? o.missSounds[lane]
                    : (o.missAll || null);
                if (mp) (function (l, p) {
                    loadSound(p, function (buf) { missBuffers[l] = buf; });
                })(lane, mp);
            }
        },

        // Chame no primeiro keypress do jogador (garante desbloqueio)
        start: function () {
            getCtx().resume().then(function () {
                if (!started && bgBuffer) playMusicFrom(pausedAt);
            });
        },

        playHit: function (lane) {
            playBuffer(hitBuffers[lane] !== undefined ? hitBuffers[lane] : hitBuffers['all']);
        },

        playMiss: function (lane) {
            playBuffer(missBuffers[lane] !== undefined ? missBuffers[lane] : missBuffers['all']);
        },

        // Altera volume da música em tempo real (0..1)
        setMusicVolume: function (v) {
            musicVolume = v;
            if (bgGain) bgGain.gain.value = v;
        },

        // Altera volume dos efeitos em tempo real (0..1)
        setSfxVolume: function (v) {
            sfxVolume = v;
            if (sfxGain) sfxGain.gain.value = v;
        },

        // Retorna posição atual da música em segundos (útil para sincronizar chart)
        getMusicTime: function () {
            if (!started || !ctx) return 0;
            return ctx.currentTime - startedAt;
        }
    };

})();

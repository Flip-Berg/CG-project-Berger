# 🎵 Doomshop Hero — Jogo 3d em WebGL 

Jogo de ritmo 3D estilo Guitar Hero/Osu!Mania, desenvolvido com WebGL puro como trabalho da disciplina de Computação Gráfica (UECE). Sem uso de bibliotecas gráficas de alto nível — toda a renderização é feita diretamente via WebGL, com `math.js` apenas para álgebra linear.
---

## 🎮 Sobre o jogo

Quatro trilhas descem em direção ao jogador ao ritmo da música **GRAILED** de 1nonly feat. Freddie Dredd. Cada trilha tem um objeto 3D animado como marcador e uma tecla correspondente. O objetivo é pressionar a tecla correta no momento em que a nota passar pela faixa branca de acerto.

### Trilhas

| Tecla | Cor | Objeto |
|-------|-----|--------|
| `D` | 🔵 Azul | Estrela girando |
| `F` | 🟢 Verde | Bola quicando |
| `J` | 🟣 Roxo | Flor de lótus girando |
| `K` | 🔴 Vermelho | Coração pulsando |
O primeiro input também desbloqueia o áudio caso o navegador tenha bloqueado a reprodução automática.

### Mecânica

- Notas descem pela trilha da música até a **faixa branca de acerto**
- Pressione a tecla certa enquanto a nota estiver sobre a faixa: **+1 ponto**
- Pressione fora do timing: **−1 ponto**
- Deixe a nota passar: **0 ponto**
- A câmera muda de ângulo automaticamente ao longo da música (frontal → três quartos → cima)

---

## ✅ Requisitos técnicos implementados

- **Projeção perspectiva** com câmera livre (3 ângulos com transição suavizada via smoothstep)
- **Iluminação Phong** com componentes ambiente, difuso e especular; luz pontual animada seguindo a câmera
- **Transformações geométricas animadas**: pulsação do coração(escala), rotação contínua da estrela e lótus, quique senoidal da bola(translação)
- **Textura**: capa do álbum renderizada como plano de fundo 3D
- **Cor sólida**: trilhas e notas renderizadas com cor pura via uniform no fragment shader
- **Leitor próprio de OBJ**: parser manual em `objloader.js` sem bibliotecas externas (lê `v`, `vn`, `f`, triangula quads via fan)
- **Interação via teclado**: teclas `D`, `F`, `J`, `K` com detecção de timing

---

## 📁 Estrutura do projeto

```
CG-project-Berger/
├── helloCG.html        # entry point: shaders GLSL, canvas, HUD
├── webgl.js            # inicialização WebGL, câmera, loop principal, drawObject
├── notes.js            # chart, spawn/update de notas, animações, drawNotes
├── input.js            # captura de teclado, checkHit, feedback visual
├── objloader.js        # parser OBJ próprio + helper setLaneOBJ
├── audio.js            # gerenciador de áudio (música + SFX)
├── math.js             # math.js (ou via CDN)
├── grailed.png         # capa do álbum (textura de fundo)(Não inclusa no github por direitos autorais)
├── credits.txt         # creditos dos criadores de todas as imagens, sons e objetos 3d não autorais
├── objs/               # objetos 3d 
│   ├── 19340_Star_v1.obj
│   ├── 13517_Beach_Ball_v2_L3.obj
│   ├── 18366_Hinduism-Lotus_Flower_V1.obj
│   └── 12190_Heart_v1_L3.obj
└── audio/ 
    ├── 1nonly - GRAILED (feat. Freddie Dredd).mp3      #(Não inclusa no github por direitos autorais)
    ├── hit.mp3                                         
    └── miss.mp3                                        
```

---

## 🚀 Como executar

Instale a música e a imagem de capa. Renomeie a música para "1nonly - GRAILED (feat. Freddie Dredd).mp3", se não possuia esse nome, e mova-a para a pasta audio/. Além dissom Renomeie a imagem para "grailed.png" e mova-a para a pasta principal

O jogo usa `fetch` para carregar os arquivos OBJ e áudio, o que exige um servidor HTTP local — abrir o `helloCG.html` diretamente pelo navegador (via `file://`) não funciona por restrições de CORS.

### Opção 1 — Python (recomendado, sem instalação extra)

```bash
# navegue até a pasta do projeto
cd CG-project-Berger

```powershell
cd C:\caminho\para\CG-project-Berger
```

# Python 3
python3 -m http.server 8000

# Python 2 (alternativa)
python -m SimpleHTTPServer 8000
```

Acesse no navegador: [http://localhost:8000/helloCG.html](http://localhost:8000/helloCG.html)

### Opção 2 — Node.js

```bash
npx serve CG-project-Berger
```

Acesse o endereço exibido no terminal (geralmente `http://localhost:3000`).

### Opção 3 — VS Code Live Server

1. Instale a extensão **Live Server** (Ritwick Dey)
2. Clique com botão direito em `helloCG.html` → **Open with Live Server**


---

## 🌐 Requisitos de navegador

- Chrome 80+ ou Firefox 75+ (recomendados)
- WebGL 1.0 habilitado (padrão em todos os navegadores modernos)
- Sem plugins ou extensões necessários

---

## 🛠️ Dependências

| Biblioteca | Uso | Fonte |
|------------|-----|-------|
| [math.js 11.11.0](https://mathjs.org) | Álgebra linear (matrizes 4×4, operações vetoriais) | CDN ou local |

Nenhuma biblioteca gráfica de alto nível (three.js, babylon.js, etc.) é utilizada.

---

## 👤 Autoria

Desenvolvido individualmente como projeto da segunda avaliação parcial de Computação Gráfica — UECE, 2026.

---

## Exemplo de gameplay

Você pode ver um exemplo de gameplay pelo youtube através do link https://youtu.be/VNz4wy0-TAQ



const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const scoreDisplay = document.createElement("div");
let score = 0;
let isGameOver = false;

// Estilizando o placar
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "20px";
scoreDisplay.style.left = "20px";
scoreDisplay.style.fontSize = "24px";
scoreDisplay.style.fontFamily = "Arial";
scoreDisplay.style.color = "black";
scoreDisplay.innerText = `Pontos: ${score}`;
document.body.appendChild(scoreDisplay);

const jumpSound = new Audio("./img/chupa.mp3.mp3"); // Som do pulo
const gameOverSound = new Audio("./img/gameover.mp3"); // Som do Game Over
const specialMusic = new Audio("./img/etreze.mp3"); // Música ao atingir 20 pontos
specialMusic.loop = true; // Definir música para tocar em loop

const jump = () => {
  if (isGameOver) return;

  mario.classList.add("jump");

  try {
    jumpSound.currentTime = 0;
    jumpSound.play();
  } catch (error) {
    console.error("Erro ao tocar som de pulo:", error);
  }

  score += 1;
  scoreDisplay.innerText = `Pontos: ${score}`;

  if (score === 20 && !isGameOver) {
    try {
      specialMusic.currentTime = 0;
      specialMusic.play(); // Toca a música especial ao atingir 20 pontos
    } catch (error) {
      console.error("Erro ao tocar música especial:", error);
    }

    // Tela branca com o GIF
    const whiteScreen = document.createElement("div");
    whiteScreen.style.position = "absolute";
    whiteScreen.style.top = "0";
    whiteScreen.style.left = "0";
    whiteScreen.style.width = "100vw";
    whiteScreen.style.height = "100vh";
    whiteScreen.style.backgroundColor = "white";
    whiteScreen.style.zIndex = "999"; // Coloca a tela branca por cima do conteúdo
    document.body.appendChild(whiteScreen);

    const gif = document.createElement("img");
    gif.src = "./img/lulatreze.gif"; // Coloque o caminho para o seu GIF aqui
    gif.style.position = "absolute";
    gif.style.top = "50%";
    gif.style.left = "50%";
    gif.style.transform = "translate(-50%, -50%)"; // Para centralizar o GIF
    gif.style.transition = "transform 1s"; // Para animação de transformação
    whiteScreen.appendChild(gif);

    // Define isGameOver como true para impedir qualquer ação adicional
    isGameOver = true;

    // Criação do efeito de "monete"
    setInterval(() => {
      const newGif = document.createElement("img");
      newGif.src = gif.src; // Mantém o mesmo GIF
      newGif.style.position = "absolute";
      newGif.style.top = `${Math.random() * 100}vh`; // Posiciona aleatoriamente na tela
      newGif.style.left = `${Math.random() * 100}vw`;
      newGif.style.transform = "scale(0.5)"; // Tamanho reduzido
      whiteScreen.appendChild(newGif);

      // Animação do novo GIF se expandindo
      setTimeout(() => {
        newGif.style.transform = "scale(1)"; // Expande o GIF
      }, 50);
    }, 500); // A cada 500ms, um novo GIF é adicionado

    // Interrompe completamente o loop do jogo
    clearInterval(loop);

    // Opcionalmente, adicione um temporizador para remover a tela após alguns segundos
    setTimeout(() => {
      whiteScreen.remove();
    }, 3000); // A tela branca e o GIF ficam por 3 segundos
  }

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", "");

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    isGameOver = true;

    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;

    mario.src = "./img/game-over.png";
    mario.style.width = "600px";
    mario.style.transition = "opacity 0.5s ease-out";
    mario.style.opacity = "0.5"; // Efeito de desbotamento

    try {
      gameOverSound.currentTime = 0;
      gameOverSound.play(); // Toca o som de Game Over
    } catch (error) {
      console.error("Erro ao tocar som de Game Over:", error);
    }

    setTimeout(() => {
      pipe.style.display = "none";
    }, 500);

    clearInterval(loop);
  }
}, 10);

document.addEventListener("keydown", jump);

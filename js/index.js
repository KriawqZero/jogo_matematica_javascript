/* Constantes de tamanho definido */
import { player, maze, questions } from './consts.js'; 
import { checkIfWinOrQuestion } from './helperFunctions.js';
/* ------------- *///* ------------- */
/* Usada em outros scripts pra liberar ou prender o jogador */
export function setPlayerRelease(released) { released ? player.released = true : player.released = false; } 
export function getPlayerRelease() { return player.released; } 
export function setCurrentQuestionIndex(val) { currentQuestionIndex = val }
/* ------------- *///* ------------- */
// Obtém o contexto do canvas para desenhar o labirinto
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 40; // Tamanho de cada célula do labirinto (40px)
const transitionSpeed = 0.1; // Ajusta a velocidade para suavidade na transição de movimento

/* ------ Cores ------ */
/* Define as cores utilizadas para diferentes elementos no labirinto */
const wallColor = '#333'; // Cor das paredes
const questionBoxColor = '#ffd700'; // Cor das caixas de pergunta
const winBoxColor = '#8fce00'; // Cor da caixa de vitória
const playerColor = '#007bff'; // Cor do jogador
/* ------ *///* ------ */

// Variáveis do timer
var timerID = null; // ID do timer, usado para limpar o intervalo
var timerRunning = null; // Status do timer (se está rodando ou não)
let currentQuestionIndex = null; // Índice da pergunta atual (inicialmente não há pergunta)

window.onload = () => {
    // Bloqueia a movimentação da tela até o início do jogo
    document.body.classList.add('modal-open');
};

/**
 * Função que inicia o jogo. Ela configura o nome do jogador e chama a função de timer.
 */
function startGame() {
    document.body.classList.remove('modal-open'); // Reabilita movimentação de tela

    player.name = document.getElementById('playerName').value.trim(); // Obtém o nome do jogador
    if (player.name === '') {
        alert('Por favor, insira seu nome.');
        return;
    }

    // Oculta o menu de início e a camada de fundo desfocada
    document.getElementById('startMenu').style.display = 'none';
    document.getElementById('blur-background').style.display = 'none';

    player.released = true; // Marca o jogador como pronto para movimentação
    startTimer(document.querySelector('#winBox')); // Inicia o timer de 5 minutos
    drawMaze(); // Desenha o labirinto inicial
}

/**
 * Inicia o timer que conta o tempo restante.
 * duration - Duração total do timer (em segundos).
 * display - Elemento onde o tempo será exibido.
 */
function startTimer(display) {
    var start = Date.now(); // Marca o momento de início do cronômetro
    var minutes, seconds, diff;

    function timer() {
        diff = ((Date.now() - start) / 1000) | 0; // Calcula o tempo decorrido em segundos
        minutes = parseInt(diff / 60, 10); // Converte o tempo decorrido em minutos
        seconds = parseInt(diff % 60, 10); // Calcula os segundos restantes

        // Formata os minutos e segundos para sempre exibir dois dígitos
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // Atualiza o display com o tempo decorrido
        display.textContent = minutes + ':' + seconds;
    }

    // Inicia o cronômetro e atualiza a cada segundo
    timerID = setInterval(timer, 1000);
}

function stopTimer() {
    clearInterval(timerID); // Para o timer
}

// Variáveis para o movimento do jogador
let targetX = player.x; 
let targetY = player.y;
let currentX = player.x;
let currentY = player.y;
/**
 * Função responsável por desenhar o labirinto.
 */
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Loop para percorrer cada célula do labirinto e desenhá-la
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            // Calcula a distância do jogador para a célula
            let distanceX = Math.abs(targetX - j);
            let distanceY = Math.abs(targetY - i);
            let distanceFromPlayer = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            // Desenha as células dentro do alcance de visão do jogador
            if (distanceFromPlayer <= player.viewDistance) {
                if (maze[i][j] === 1) {
                    ctx.fillStyle = wallColor; // Paredes
                } else if (maze[i][j] === 2) {
                    ctx.fillStyle = questionBoxColor; // Caixa de pergunta
                } else if (maze[i][j] === 4) {
                    ctx.fillStyle = winBoxColor; // Caixa de vitória
                } else {
                    ctx.fillStyle = '#eee'; // Caminho visível
                }
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize); // Desenha a célula
            } else if (distanceFromPlayer <= player.viewDistance + 2) {
                // Transição suave com desfoque para as áreas fora de vista
                const blurLevel = Math.min(8, 2 * (distanceFromPlayer - player.viewDistance));
                ctx.filter = `blur(${blurLevel}px)`;
                ctx.fillStyle = '#333'; // Cor da área borrada
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            } else {
                // Área totalmente fora da visão
                ctx.filter = 'blur(12px)';
                ctx.fillStyle = '#222'; // Cor da área escura
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
            ctx.filter = 'none'; // Reset do filtro de desfoque para a próxima célula
        }
    }

    // Interpolação suave para o movimento do personagem (suaviza a transição de posições)
    currentX += (targetX - currentX) * transitionSpeed;
    currentY += (targetY - currentY) * transitionSpeed;

    // Desenha o personagem no labirinto
    ctx.fillStyle = playerColor;
    ctx.beginPath();
    ctx.arc(
        currentX * cellSize + cellSize / 2,
        currentY * cellSize + cellSize / 2,
        cellSize / 3, 0, 2 * Math.PI
    );
    ctx.fill();

    requestAnimationFrame(drawMaze); // Requisição para desenhar o labirinto continuamente
}

/**
 * Função para verificar se a resposta do jogador está correta.
 */
function checkAnswer() {
    let answer = document.getElementById('answerInput').value.trim(); // Obtém a resposta do jogador
    if (answer.includes(',')) answer = answer.replace(',', '.'); // Substitui vírgula por ponto

    if (answer === questions[currentQuestionIndex].answer) {
        maze[player.y][player.x] = 0; // Marca o local como vazio
        document.getElementById('answerInput').value = ''; // Limpa o campo de resposta
        document.getElementById('questionBox').style.display = 'none'; // Oculta a caixa de pergunta
        drawMaze(); // Redesenha o labirinto
        currentQuestionIndex = null; // Reseta o índice da pergunta
        player.released = true; // Libera o jogador para se mover
    } else {
        alert("Resposta incorreta. Tente novamente.");
        player.released = false; // Impede o movimento até a próxima tentativa
    }
}

/**
 * Função que move o jogador pelas células do labirinto.
 * dx - Deslocamento horizontal (1 ou -1).
 * dy - Deslocamento vertical (1 ou -1).
 */
function movePlayer(dx, dy) {
    let newX = player.x + dx;
    let newY = player.y + dy;

    // Verifica se o movimento é válido (dentro dos limites do labirinto e sem colidir com uma parede)
    if (newX >= 0 &&
    newY >= 0 &&
    newX < maze[0].length &&
    newY < maze.length &&
    maze[newY][newX] !== 1 && // Não permite mover em paredes
    player.released
    ) {
        player.oldX = player.x;
        player.oldY = player.y;
        targetX = newX;
        targetY = newY;
        player.x = newX;
        player.y = newY;

        if (checkIfWinOrQuestion(maze, player.y, player.x, questions)) player.released = false; // Verifica vitória ou questão

        drawMaze(); // Redesenha o labirinto com o novo movimento
    }
}

// Função padrão para movimentar o jogador usando o teclado
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Enter':
            if (document.getElementById('startMenu').style.display != 'none') startGame();
            else if (document.getElementById('questionBox').style.display != 'none') checkAnswer();
            else break;
        case 'ArrowUp':
        case 'w':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
            movePlayer(1, 0);
            break;
    }
});


drawMaze(); // Chama a função para desenhar o labirinto inicial
// Expõe funções globais para uso em outros scripts
window.movePlayer = movePlayer;
window.startGame = startGame;
window.checkAnswer = checkAnswer;

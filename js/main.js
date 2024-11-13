/**
 * Código do jogo escrito por Marcilio Ortiz
 * no grupo de trabalho escolar de Geometria Plana
 * de Matemática 5 com a professora Mariana Manfroi.
 * Turma: 20210 - 5º Semestre
 * Alunos: Marcilio Ortiz - Desenvolvedor do script do jogo
 * Davi - Design das imagens e da parte gráfica do jogo, também fez os labirintos
 * Luiza Mabel - Designer das regras e panfletagem
 * Maria Clara - Fez e analisou todas as questões e respostas das questões
 */

/* Importações de constantes e funções auxiliares */
import { maze } from './consts.js';
import { checkIfWinOrQuestion, checkAnswer, giveUpQuestion } from './helperFunctions.js';
import {
    player, canvas, ctx, transitionSpeed, pathColor, offViewColor, blurColor, wallColor,
    questionBoxColor, winBoxColor, playerColor, timerID, targetX, targetY, currentX, currentY
} from './vars.js';

/**
 * Exporta funções e variáveis para uso em outros scripts
 */
export function setPlayerRelease(released) {
    released ? player.released = true : player.released = false;
} export { movePlayer, player, drawMaze, maze, timerID, startGame };


// Carregamento da página inicial
window.onload = () => {
    // Bloqueia a movimentação da tela até o início do jogo
    document.body.classList.add('modal-open');
};

/**
 * Função que inicia o jogo.
 * Ela configura o nome do jogador e chama a função de timer.
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
 * Função que inicia o timer para contar o tempo restante.
 * @param {HTMLElement} display - Elemento onde o tempo será exibido.
 */
function startTimer(display) {
    const start = Date.now(); // Marca o momento de início do cronômetro
    function timer() {
        const diff = Math.floor((Date.now() - start) / 1000); // Calcula o tempo decorrido em segundos
        let minutes = Math.floor(diff / 60); // Converte o tempo decorrido em minutos
        let seconds = diff % 60; // Calcula os segundos restantes
        // Formata os minutos e segundos para sempre exibir dois dígitos
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        // Atualiza o display com o tempo decorrido
        display.textContent = minutes + ':' + seconds;
    }
    // Inicia o cronômetro e atualiza a cada segundo
    timerID = setInterval(timer, 1000);
}

/**
 * Função responsável por desenhar o labirinto.
 */
function drawMaze() {
    // Ajusta o tamanho das células com base no tamanho do labirinto e do canvas
    const rows = maze.length;
    const cols = maze[0].length;
    const cellSize = Math.min(canvas.width / cols, canvas.height / rows);
    let distanceFromPlayer;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
    // Loop para percorrer cada célula do labirinto e desenhá-la
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            // Calcula a distância do jogador para a célula
            let distanceX = Math.abs(targetX - j);
            let distanceY = Math.abs(targetY - i);
            distanceFromPlayer = Math.sqrt(distanceX ** 2 + distanceY ** 2);
            // Desenha as células dentro do alcance de visão do jogador
            if (distanceFromPlayer <= player.viewDistance) {
                ctx.fillStyle = maze[i][j] === 1 ? wallColor :
                    maze[i][j] === 2 ? questionBoxColor :
                        maze[i][j] === 4 ? winBoxColor : pathColor;
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize); // Desenha a célula
            } else if (distanceFromPlayer <= player.viewDistance + 1) {
                // Transição suave com desfoque para as áreas fora de vista
                Math.min(8, 2 * (distanceFromPlayer - player.viewDistance));
                // ctx.filter = `blur(${blurLevel}px)`;
                ctx.fillStyle = blurColor; // Cor da área borrada
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            } else {
                // Área totalmente fora da visão
                // ctx.filter = 'blur(12px)';
                ctx.fillStyle = offViewColor; // Cor da área escura
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
 * Função que move o jogador pelas células do labirinto.
 * @param {number} dx - Deslocamento horizontal (1 ou -1).
 * @param {number} dy - Deslocamento vertical (1 ou -1).
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
        // Atualiza a última posição de movimento do jogador
        player.oldX = -dx;
        player.oldY = -dy;
        targetX = newX;
        targetY = newY;
        player.x = newX;
        player.y = newY;
        checkIfWinOrQuestion(player.y, player.x); // Verifica vitória ou questão
        drawMaze(); // Redesenha o labirinto com o novo movimento
    }
}

// Função padrão para movimentar o jogador usando o teclado
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'Enter':
            if (document.getElementById('startMenu').style.display !== 'none') {
                startGame();
                break;
            } else if (document.getElementById('questionBox').style.display !== 'none') {
                checkAnswer();
                break;
            } else {
                break;
            }
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

/**
 * Expõe funções globais para uso em outros scripts
 */
window.movePlayer = movePlayer;
window.startGame = startGame;
window.checkAnswer = checkAnswer;
window.giveUpQuestion = giveUpQuestion;
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

import { movePlayer, setPlayerRelease, player, drawMaze, maze, timerID } from "./main.js";
import { questions } from "./consts.js";
/**
 * Função que exibe a pergunta ao jogador.
 * index - Índice da pergunta a ser exibida.
 * usada por checkIfWinOrQuestion em helperFunctions.js
 * Se todas as perguntas foram usadas, reinicia o status de 'usado' para todas.
 */
var currentQuestionIndex = null;
function showQuestion() {
    /* Pegar índice de questão nao utilizada */
    let unusedQuestions = questions.filter(q => !q.used); // Filtra as perguntas não utilizadas
    if (unusedQuestions.length === 0) {
        questions.forEach(q => q.used = false); // Reinicia todas as perguntas
        unusedQuestions = questions;
    }
    /* ----------- *///* ----------- */

    const randomIndex = Math.floor(Math.random() * unusedQuestions.length); // Seleciona uma pergunta aleatória
    const index = questions.indexOf(unusedQuestions[randomIndex]);

    setPlayerRelease(false); // Impede o jogador de se mover enquanto responde
    currentQuestionIndex = index; // Define a pergunta atual

    document.body.classList.add('modal-open'); //Desabilita movimento no scroll
    document.getElementById('questionText').innerText = questions[index].text; // Exibe a pergunta
    document.getElementById('questionBox').style.display = 'block'; // Exibe a caixa de pergunta
    document.getElementById('blur-background').style.display = 'block';
}

/**
 * Função para verificar se a resposta do jogador está correta.
 */
export function checkAnswer() {
    let marginError = player.marginError;
    let answer = document.getElementById('answerInput').value.trim(); // Obtém a resposta do jogador
    let correctAnswer = questions[currentQuestionIndex].answer;
    if (answer.includes(',')) answer = answer.replace(',', '.'); // Substitui vírgula por ponto
    try {
        answer = parseFloat(answer); 
    } catch {
        alert('Resposta inválida, tente um valor numérico');
        return false;
    }
    function isInMarginError(answer, correctAnswer, marginError) {
        if(Math.abs(answer - correctAnswer) <= marginError) return true
        else return false;
    }

    if (isInMarginError(answer, correctAnswer, marginError)) {
        maze[player.y][player.x] = 0; // Marca o local como vazio
        document.getElementById('answerInput').value = ''; // Limpa o campo de resposta
        document.body.classList.remove('modal-open'); // Reabilita movimento no scroll
        document.getElementById('questionBox').style.display = 'none'; // Oculta a caixa de pergunta
        document.getElementById('blur-background').style.display = 'none';
        drawMaze(); // Redesenha o labirinto
        questions[currentQuestionIndex].used = true; // Marca a pergunta como 'usada'
        setPlayerRelease(true); // Libera o jogador para se mover
        
        currentQuestionIndex = null; // Reseta o índice da pergunta
    } else {
        alert("Resposta incorreta. Tente novamente.");
        setPlayerRelease(false); // Impede o movimento até a próxima tentativa
    }
}

/**
 * Função que verifica se o jogador venceu ou encontrou uma questão.
*/
export function checkIfWinOrQuestion(pY, pX) {
    if (maze[pY][pX] === 4) {
        document.getElementById('winBox').innerHTML = '<span style="color: green">Parabéns! Vc ganhou</span>';
        //stopTimer(); // Para o timer ao ganhar
        setPlayerRelease(false);
        clearInterval(timerID); // Para o timer
    }
    if (maze[pY][pX] === 2) {
        showQuestion(questions); // Mostra a próxima pergunta
        setPlayerRelease(false);
    } else setPlayerRelease(true);
}

export function giveUpQuestion() {
    console.clear();
    document.getElementById('answerInput').value = ''; // Limpa o campo de resposta
    document.body.classList.remove('modal-open'); // Reabilita movimento no scroll
    document.getElementById('questionBox').style.display = 'none'; // Oculta a caixa de pergunta
    document.getElementById('blur-background').style.display = 'none';
    currentQuestionIndex = null; // Reseta o índice da pergunta
    setPlayerRelease(true); // Libera o jogador para se mover
    movePlayer(player.oldX, player.oldY);
}

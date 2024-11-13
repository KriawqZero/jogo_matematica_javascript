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
import { movePlayer, setPlayerRelease, drawMaze, maze, timerID } from "./main.js";
import { questions } from "./consts.js";
import { player } from "./vars.js";

let currentQuestionIndex = null;

/**
 * Função que exibe a pergunta ao jogador.
 * Filtra as perguntas não utilizadas, seleciona uma pergunta aleatória,
 * impede o jogador de se mover enquanto responde,
 * e exibe a pergunta na interface do usuário.
 */
function showQuestion() {
    // Filtra as perguntas não utilizadas
    let unusedQuestions = questions.filter(q => !q.used);
    if (unusedQuestions.length === 0) {
        questions.forEach(q => q.used = false); // Reinicia todas as perguntas
        unusedQuestions = questions;
    }

    // Seleciona uma pergunta aleatória do conjunto de perguntas não utilizadas
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    const index = questions.indexOf(unusedQuestions[randomIndex]);

    // Impede o jogador de se mover enquanto responde
    setPlayerRelease(false);
    currentQuestionIndex = index;

    // Desabilita movimento no scroll e exibe a pergunta
    document.body.classList.add('modal-open');
    document.getElementById('questionText').innerText = questions[index].text;
    document.getElementById('questionBox').style.display = 'block';
    document.getElementById('blur-background').style.display = 'block';
}

/**
 * Função para verificar se a resposta do jogador está correta.
 * Obtém a resposta do jogador, a converte para número,
 * verifica se está dentro da margem de erro permitida,
 * e fornece feedback ao jogador.
 */
export function checkAnswer() {
    let marginError = player.marginError;
    let answer = document.getElementById('answerInput').value.trim();
    let correctAnswer = questions[currentQuestionIndex].answer;

    if (answer.includes(',')) answer = answer.replace(',', '.'); // Substitui vírgula por ponto
    try {
        answer = parseFloat(answer);
    } catch {
        alert('Resposta inválida, tente um valor numérico');
        return false;
    }

    // Função auxiliar para verificar se a resposta está dentro da margem de erro
    function isInMarginError(answer, correctAnswer, marginError) {
        return Math.abs(answer - correctAnswer) <= marginError;
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
 * Caso vença, exibe uma mensagem de vitória e para o timer.
 * Caso encontre uma questão, mostra a próxima pergunta.
 * Caso contrário, libera o movimento do jogador.
 */
export function checkIfWinOrQuestion(pY, pX) {
    if (maze[pY][pX] === 4) {
        document.getElementById('winBox').innerHTML = '<span style="color: green">Parabéns! Você ganhou</span>';
        setPlayerRelease(false);
        clearInterval(timerID); // Para o timer
    }
    if (maze[pY][pX] === 2) {
        showQuestion(questions); // Mostra a próxima pergunta
        setPlayerRelease(false);
    } else setPlayerRelease(true);
}

/**
 * Função que permite que o jogador desista da questão atual.
 * Limpa o campo de resposta, oculta a caixa de pergunta,
 * redefine o índice da pergunta atual, e move o jogador para sua posição anterior.
 */
export function giveUpQuestion() {
    console.clear();
    document.getElementById('answerInput').value = ''; // Limpa o campo de resposta
    document.body.classList.remove('modal-open'); // Reabilita movimento no scroll
    document.getElementById('questionBox').style.display = 'none'; // Oculta a caixa de pergunta
    document.getElementById('blur-background').style.display = 'none';

    currentQuestionIndex = null; // Reseta o índice da pergunta
    setPlayerRelease(true); // Libera o jogador para se mover
    movePlayer(player.oldX, player.oldY); // Move o jogador para sua posição anterior
}
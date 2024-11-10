import { getPlayerRelease, setPlayerRelease, setCurrentQuestionIndex } from "./index.js";
/**
 * Função que obtém um índice de uma pergunta não utilizada.
 * Se todas as perguntas foram usadas, reinicia o status de 'usado' para todas.
 */
function getUnusedQuestionIndex(questions) {
    let unusedQuestions = questions.filter(q => !q.used); // Filtra as perguntas não utilizadas

    if (unusedQuestions.length === 0) {
        questions.forEach(q => q.used = false); // Reinicia todas as perguntas
        unusedQuestions = questions;
    }

    const randomIndex = Math.floor(Math.random() * unusedQuestions.length); // Seleciona uma pergunta aleatória
    const questionIndex = questions.indexOf(unusedQuestions[randomIndex]);

    questions[questionIndex].used = true; // Marca a pergunta como 'usada'

    return questionIndex; // Retorna o índice da pergunta
}
/**
 * Função que exibe a pergunta ao jogador.
 * index - Índice da pergunta a ser exibida.
 * usada por checkIfWinOrQuestion em helperFunctions.js
 */
function showQuestion(index, questions) {
    setPlayerRelease(false); // Impede o jogador de se mover enquanto responde
    setCurrentQuestionIndex(index); // Define a pergunta atual
    document.getElementById('questionText').innerText = questions[index].text; // Exibe a pergunta
    document.getElementById('questionBox').style.display = 'block'; // Exibe a caixa de pergunta
}
/**
 * Função que verifica se o jogador venceu ou encontrou uma questão.
*/
export function checkIfWinOrQuestion(maze, pY, pX, questions) {
    if (maze[pY][pX] === 4) {
        document.getElementById('winBox').innerHTML = '<span style="color: green">Parabéns! Vc ganhou</span>';
        stopTimer(); // Para o timer ao ganhar
        return true;
    }
    if (maze[pY][pX] === 2) {
        showQuestion(getUnusedQuestionIndex(questions), questions); // Mostra a próxima pergunta
        return true;
    } else return false;
}


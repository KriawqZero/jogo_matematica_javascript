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

/**
 * Constante da geração do mapa
 * 0 = caminho livre,
 * 1 = obstaculo (parede)
 * 2 = porta pra abrir (pra abrir tem que responder uma questão)
 * 4 = chegada
 */
export const mazeEasy = [
    [0, 1, 0, 1, 0, 0, 1, 4],
    [0, 1, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 2, 0],
    [1, 1, 0, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 0],
    [2, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 2, 0]
];
export const maze = [
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [2, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 2, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 4]
];


// Questões fáceis
export const questions = [
    { text: "Qual é a área de um triângulo com base 4 e altura 5?", answer: "10", used: false },
    { text: "Qual é o perímetro de um quadrado com lado 3?", answer: "12", used: false },
    { text: "Quantos lados possui um hexágono?", answer: "6", used: false },
    { text: "Quantos graus possui cada ângulo interno de um quadrado?", answer: "90", used: false },
    { text: "Quantos lados possui um decágono?", answer: "10", used: false },
];

// Questões médias
export const mediumQuestions = [
    { text: "Qual é o perímetro de um triângulo equilátero com lado 5?", answer: "15", used: false },
    { text: "Quantos graus há na soma dos ângulos internos de um pentágono?", answer: "540", used: false },
    { text: "Qual é o perímetro de um retângulo com comprimento 10 e largura 4?", answer: "28", used: false },
    { text: "Qual é a área de um paralelogramo com base 8 e altura 3?", answer: "24", used: false },
    { text: "Qual é a área de um retângulo com base 6 e altura 7?", answer: "42", used: false },
    { text: "Quantos lados possui um heptágono?", answer: "7", used: false },
    { text: "Qual é a área de um trapézio com bases 6 e 10 e altura 4?", answer: "32", used: false },
    { text: "Qual é o comprimento da diagonal de um quadrado com lado 4? (Aproximadamente)", answer: "5.7", used: false },
    { text: "Qual é o comprimento de um círculo com raio 3? (π ≈ 3,14)", answer: "18.84", used: false },
    { text: "Qual é a área de um círculo com diâmetro 10? (π ≈ 3,14)", answer: "78.5", used: false },
];

// Questões difíceis
export const hardQuestions = [
    { text: "Qual é o raio de um círculo com área 50.24? (π ≈ 3,14)", answer: "4", used: false },
    { text: "Qual é a área de um triângulo equilátero com lado 6? (Aproximadamente)", answer: "15.6", used: false },
    { text: "Qual é a área de um losango com diagonais de 10 e 8?", answer: "40", used: false },
    { text: "Qual é o perímetro de um hexágono regular com lado 7?", answer: "42", used: false },
    { text: "Quantos graus possui cada ângulo interno de um pentágono regular?", answer: "108", used: false },
    { text: "Qual é a área de um setor circular com raio 5 e ângulo central de 60°? (π ≈ 3,14)", answer: "13.1", used: false },
    { text: "Qual é a altura de um triângulo isósceles com base 6 e lados iguais de 5? (Aproximadamente)", answer: "4", used: false },
    { text: "Qual é a área de um polígono regular de 6 lados com lado 4? (Aproximadamente)", answer: "41.6", used: false },
    { text: "Qual é a área de um triângulo retângulo com catetos de 5 e 12?", answer: "30", used: false },
    { text: "Qual é o comprimento da diagonal de um retângulo com lados 6 e 8?", answer: "10", used: false },
];

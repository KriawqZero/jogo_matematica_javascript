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

export let player = { 
    x: 0, y: 0, 
    oldX: 0, oldY: 0, 
    name: '', 
    released: false,
    viewDistance: 3
}; 

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

export const questions = [
    { text: "Qual é a área de um triângulo com base 4 e altura 5?", answer: "10" },
    { text: "Qual é o perímetro de um quadrado com lado 3?", answer: "12" },
    { text: "Qual é o raio de um círculo com área 50.24?", answer: "4" },
    { text: "Quantos lados possui um hexágono?", answer: "6" },
    { text: "Qual é a área de um retângulo com base 6 e altura 7?", answer: "42" },
    { text: "Qual é o comprimento da circunferência de um círculo com raio 3? (Aproximadamente)", answer: "18.8" },
    { text: "Quantos graus há na soma dos ângulos internos de um pentágono?", answer: "540" },
    { text: "Qual é o volume de um cubo com aresta 4?", answer: "64" },
    { text: "Qual é o perímetro de um triângulo equilátero com lado 5?", answer: "15" },
    { text: "Quantos lados possui um decágono?", answer: "10" },
    { text: "Qual é a área de um círculo com raio 7? (Aproximadamente)", answer: "153.9" },
    { text: "Qual é o volume de um cilindro com raio 3 e altura 5? (Aproximadamente)", answer: "141.3" },
    { text: "Quantos graus possui cada ângulo interno de um quadrado?", answer: "90" },
    { text: "Qual é a área de um paralelogramo com base 8 e altura 3?", answer: "24" },
    { text: "Qual é o perímetro de um retângulo com comprimento 10 e largura 4?", answer: "28" },
    { text: "Qual é a área de um triângulo equilátero com lado 6? (Aproximadamente)", answer: "15.6" },
    { text: "Quantos lados possui um heptágono?", answer: "7" },
    { text: "Qual é a área de um trapézio com bases 6 e 10 e altura 4?", answer: "32" },
    { text: "Qual é o volume de uma esfera com raio 2? (Aproximadamente)", answer: "33.5" }
];
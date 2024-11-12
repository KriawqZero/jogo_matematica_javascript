/**
 * Uma referência ao elemento canvas do HTML com o ID 'mazeCanvas'.
 * Este elemento é usado para renderizar o labirinto.
 *
 * O elemento canvas fornece uma superfície de desenho para renderização de gráficos 2D.
 * Ele é recuperado usando o metodo `document.getElementById`.
 *
 * @type {HTMLCanvasElement}
 */
export const canvas = document.getElementById('mazeCanvas');

/**
 * O contexto de renderização para uma superfície de desenho 2D de um elemento `<canvas>`.
 * Fornece métodos e propriedades para desenhar e manipular gráficos em um canvas.
 *
 * @type {CanvasRenderingContext2D}
 */
export const ctx = canvas.getContext('2d');

/**
 * Especifica a velocidade das transições em segundos.
 *
 * Esta variável é usada para controlar quão rápido ou devagar certas animações de transição
 * devem ocorrer dentro da aplicação. O valor é um número de ponto flutuante que representa o tempo em segundos.
 *
 * Exemplo:
 * - Um valor de `0.1` significa que a transição levará 0.1 segundos (100 milissegundos).
 * - Um valor maior tornará a transição mais lenta, enquanto um valor menor a tornará mais rápida.
 */
export const transitionSpeed = 0.1;

/**
 * Representa a cor usada para destacar um caminho especificado.
 * O valor é uma string contendo um código de cor hexadecimal.
 *
 * Exemplo: '#cef5e3' é uma cor verde clara.
 */
export const pathColor = '#cef5e3';

/**
 * O código de cor representando o estado "desligado" de uma visualização.
 *
 * Esta variável é usada para definir a cor da visualização quando está em um estado inativo ou desativado.
 * O valor é uma string representando um código de cor em formato hexadecimal.
 *
 * Valor padrão: '#000' (preto).
 */
export const offViewColor = '#000';

/**
 * O código de cor hexadecimal usado para aplicar um efeito de desfoque a um elemento.
 * O valor padrão é um tom escuro, representado pelo código de cor '#111'.
 * Esta variável pode ser usada para definir a cor de desfoque para vários elementos da interface do usuário
 * para melhorar a estética visual.
 */
export const blurColor = '#111';

/**
 * Representa a cor de uma parede em um código de cor hexadecimal.
 *
 * A cor é especificada como uma string no formato hexadecimal.
 * Exemplo de um código de cor hexadecimal: "#293630"
 */
export const wallColor = '#293630'; // Cor das paredes

/**
 * A cor a ser usada para o componente de interface do usuário da caixa de perguntas.
 *
 * O valor da cor é representado como uma string hexadecimal.
 * Neste caso, a cor é definida para um tom de amarelo dourado (`#ffd700`).
 *
 * @type {string}
 * @default '#ffd700'
 */
export const questionBoxColor = '#ffd700'; // Cor das caixas de pergunta

/**
 * Representa a cor da caixa de vitória.
 * A cor é definida usando uma string hexadecimal.
 * Exemplo: '#8fce00' representa um tom de verde.
 */
export const winBoxColor = '#8fce00'; // Cor da caixa de vitória

/**
 * O código de cor representando a cor de um jogador na interface do usuário.
 * Esta cor é geralmente associada à equipe ou status do jogador.
 * O valor está no formato hexadecimal.
 *
 * Exemplo de uso:
 * ```javascript
 * console.log(playerColor); // Saída: '#007bff'
 * ```
 */
export const playerColor = '#007bff'; // Cor do jogador

/**
 * Um identificador único para um temporizador.
 *
 * Esta variável é usada para armazenar o ID de um temporizador criado usando setTimeout ou setInterval.
 * Pode ser usada para referenciar e controlar o temporizador, como limpar com clearTimeout ou clearInterval.
 * A variável é inicializada como null, o que indica que nenhum temporizador está definido no momento.
 *
 * @type {number|null}
 */
export let timerID = null; // ID do timer, usado para limpar o intervalo

/**
 * Representa a posição horizontal alvo na grade do jogo.
 * Esta variável é usada para armazenar a coordenada X da posição do jogador.
 * Ela é tipicamente atualizada sempre que a posição do jogador muda.
 *
 * @type {number}
 */
export let targetX = player.x;

/**
 * Representa a coordenada Y da posição do jogador.
 *
 * @type {number}
 */
export let targetY = player.y;

/**
 * Representa a coordenada x atual do jogador.
 * Este valor está dinamicamente ligado à posição x do jogador
 * e deve ser atualizado conforme o jogador se move.
 *
 * @type {number}
 */
export let currentX = player.x;

/**
 * A posição vertical atual do jogador.
 *
 * Este valor representa a coordenada `y` da posição do jogador no mundo do jogo.
 * É dinamicamente atualizado conforme a posição do jogador muda.
 *
 * @type {number}
 */
export let currentY = player.y;

/**
 * Representa a distância do jogador a um ponto específico no mundo do jogo.
 * Este valor é tipicamente usado para determinar o alcance das interações do jogador,
 * disparar eventos ou calcular distâncias para mecânicas de jogo.
 *
 * @type {number}
 */
export let distanceFromPlayer;

window.targetX = targetX;
window.targetY = targetY;
window.currentX = currentX;
window.currentY = currentY;
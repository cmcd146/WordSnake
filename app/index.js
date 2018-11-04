/**
 * Application entry point
 */

/**
 * files needed
 * 
 * board.js
 * coord.js
 * score.js
 * word-snake-view.js
 * word-snake.js
 * dictionary.js
 * 
 */


// Load application styles
import 'styles/index.scss';
const WordSnake = require("./word-snake");

document.addEventListener("DOMContentLoaded", () => {

    const game = new WordSnake();
    game.board.render();
});


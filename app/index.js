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

    const figure = document.getElementById("word-snake-game");
    var score = document.getElementById("score");

    const game = new WordSnake();
    game.start();
});


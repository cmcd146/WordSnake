/**
 * Application entry point
 */


// Load application styles
import 'styles/index.scss';
const WordSnake = require("./word-snake");

document.addEventListener("DOMContentLoaded", () => {

    const game = new WordSnake();
    game.board.render();
});


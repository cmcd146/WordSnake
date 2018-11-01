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
const Board = require("./board")

document.addEventListener("DOMContentLoaded", () => {

    const figure = document.getElementById("word-snake-game");
    var score = document.getElementById("score");

    document.addEventListener("keydown", e => { 
        if(e.keyCode === 32){
            e.preventDefault();
            alert(e.keyCode)
            score.innerHTML = "100";
        }
    });

    const board = new Board(10);
    board.render();
});


const Board = require("./board");

class WordSnake {
    constructor() {
        this.board = new Board(10);
        this.cursor = this.board.cursor;
        this.currWord = "";
        document.addEventListener('keydown', this.handleKeydown.bind(this))
    }

    start() {
        this.board.render();
    }

    checkOver() {
        if (this.board.checkOver()) {
            alert("GAME OVER");
        }
    }


    handleKeydown(e) {
        if (e.keyCode >= 65 && e.keyCode <= 90 && this.board.validPosition(this.cursor.currSpace)) {
            // letter key is pressed
            this.currWord += keybinds[e.keyCode];
            let letter = keybinds[e.keyCode]
            this.board.letters[this.cursor.currSpace.toString()] = letter;
            this.cursor.nextSpace();
        } else if (e.keyCode == 8 && (this.currWord != '' && this.currWord.length != 1)) {
            // delete key is pressed
            this.currWord = this.currWord.slice(0, -1);
            this.cursor.backSpace();
        } else if (e.keyCode == 13 && (this.currWord.length != 0 && this.currWord.length != 1)) {
            // enter key is pressed
            this.currWord = this.board.letters[this.cursor.currWordCords.slice(-1).toString()];
            this.board.newTurn();
        } else if (e.keyCode >= 37 && e.keyCode <= 40 && this.currWord.length == 1) {
            // directional arrow is pressed
            this.cursor.arrowKeyPress(keybinds[e.keyCode]);
        }
        this.board.render();
        this.checkOver();
    }
}



let keybinds = {
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    37: "W",
    38: "N",
    39: "E",
    40: "S"

}

module.exports = WordSnake;
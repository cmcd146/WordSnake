const board = require("./board")

class WordSnakeView {
    constructor(dim){
        this.board = new board(dim);
    }

    
}

WordSnakeView.MOVES = {
    37: "LEFT",
    38: "UP",
    39: "RIGHT",
    40: "DOWN"
}

module.exports = WordSnakeView;
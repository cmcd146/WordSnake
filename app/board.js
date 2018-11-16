const Cursor = require("./cursor")

// Board class that creates and renders board, contains some game logic
class Board {
    constructor (dim) {
        this.dim = dim
        this.grid = Board.blankGrid(dim)
        this.cursor = new Cursor()
        this.letters = {};
    }

    // create blank grid for board
    static blankGrid(dim) {
        const grid = [];
        for (let i = 0; i < dim; i++) {
            const row = [];
            for(let j = 0; j < dim; j++) {
                row.push("x");
            }
            grid.push(row);
        }
        return grid;
    }

    // Render html representation of board and add it to the page
    render() {
        let html = "";

        for (let i = 0; i < this.dim; i++) {
            html += "<ul>";

            for (let j = 0; j < this.dim; j++) {
                let coor = [i,j];

                // depending on status of coordinate, add li with different classes
                if(this.checkCurrWord(coor)){
                    html += `<li><p class='cursor-word'><span class='letter'>${this.letters[coor.toString()]}<span></p></li>`;
                } else if (this.checkOld(coor)){
                    html += `<li><p class='old'><span class='letter'>${this.letters[coor.toString()]}<span></p></li>`;
                } else if (this.checkCurrSpace(coor)) {
                    html += "<li><p class='cursor-space'></p></li>"
                } else {
                    // empty li if space is free
                    html += "<li></li>";
                }
            }
            html += "</ul>";
        }

        const figure = document.getElementById("word-snake-game");
        figure.innerHTML = html;
    }

    // check if particular coordinate is in the current word being built
    checkCurrWord(coor) {
        let currents = this.cursor.currWordCords;
        for(let i = 0; i < currents.length; i++) {
            let cursorCoor = currents[i];
            if (coor[0] == cursorCoor[0] && coor[1] == cursorCoor[1]){
                return true;
            }
        };
        return false;
    }

    // check if particular coordinate has been used for a completed word
    checkOld(coor) {
        let olds = this.cursor.old;
        for (let i = 0; i < olds.length; i++) {
            let cursorCoor = olds[i];
            if (coor[0] == cursorCoor[0] && coor[1] == cursorCoor[1]) {
                return true;
            }
        };
        return false;
    }

    // check if coordinate is the current space, waiting for a letter keypress
    checkCurrSpace(coor) {
        let currSpace = this.cursor.currSpace;
        if(coor[0] == currSpace[0] && coor[1] == currSpace[1]){
            return true;
        }
        return false;
    }

    // add letter to POJO that tracks what letter is in which spot
    addLetter(char) {
        let coor = this.cursor.currWordCords[-1]
        this.letters[coor] = char
    }

    // move cursor until it is in a valid spot when user finishes a turn
    newTurn() {
        this.cursor.newTurn();
        while(!this.validPosition(this.cursor.currSpace)) {
            this.cursor.changeDir();
        }
        this.cursor.direction = this.cursor.temp_dir;
    }

    // check if the player is trapped
    checkOver() {
        for (let i = 0; i <= 3; i++) {
            let check_dir = this.cursor.currWordCords[0].map((coord, idx) => {
                return coord + Object.values(directions)[i][idx];
            });
            if(this.validPosition(check_dir)){
                return false;
            }
        }
        return true;
    }

    // Change direction when user presses arrow key
    arrowKeyPress(dir) {
        let possibleCurrSpot = this.cursor.arrowKeyPress(dir);
        if (this.validPosition(possibleCurrSpot) && dir != this.cursor.lastDir) {
            this.cursor.currSpace = possibleCurrSpot;
            this.cursor.direction = dir;
        }
    }

    // check if coordinate is a valid position
    validPosition(coord) {
        return (coord[0] >= 0) && (coord[0] < this.dim) &&
            (coord[1] >= 0) && (coord[1] < this.dim) && 
            this.cursor.checkOlds(coord) &&
            this.cursor.checkCurr(coord);
    }
}

const directions = {
    "E": [0, 1],
    "S": [1, 0],
    "W": [0, -1],
    "N": [-1, 0]
}


module.exports = Board;
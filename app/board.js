const Cursor = require("./cursor")


class Board {
    constructor (dim) {
        this.dim = dim
        this.grid = Board.blankGrid(dim)
        this.cursor = new Cursor()
        this.letters = {};
    }

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

    render() {
        let html = "";

        for (let i = 0; i < this.dim; i++) {
            html += "<ul>";
            for (let j = 0; j < this.dim; j++) {
                let coor = [i,j];
                if(this.checkCurrWord(coor)){
                    html += `<li><p class='cursor-word'><span class='letter'>${this.letters[coor.toString()]}<span></p></li>`;
                } else if (this.checkOld(coor)){
                    html += `<li><p class='old'><span class='letter'>${this.letters[coor.toString()]}<span></p></li>`;
                } else if (this.checkCurrSpace(coor)) {
                    html += "<li><p class='cursor-space'></p></li>"
                } else {
                    html += "<li></li>";
                }
            }
            html += "</ul>";
        }

        const figure = document.getElementById("word-snake-game");
        figure.innerHTML = html;
    }

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

    checkCurrSpace(coor) {
        let currSpace = this.cursor.currSpace;
        if(coor[0] == currSpace[0] && coor[1] == currSpace[1]){
            return true;
        }
        return false;
    }

    addLetter(char) {
        let coor = this.cursor.currWordCords[-1]
        this.cursor.letters[coor] = char
    }

    newTurn() {
        this.cursor.newTurn();
        while(!this.validPosition(this.cursor.currSpace)) {
            this.cursor.changeDir();
        }
    }

    checkOver() {
        for (let i = 0; i <= 3; i++) {
            if(this.cursor.currWordCords.length == 0) {
                return false;
            }
            let check_dir = this.cursor.currWordCords[0].map((coord, idx) => {
                return coord + Object.values(directions)[i][idx];
            });
            if(this.validPosition(check_dir)){
                return false;
            }
        }
        return true;
    }

    validPosition(coord) {
        return (coord[0] >= 0) && (coord[0] < this.dim) &&
            (coord[1] >= 0) && (coord[1] < this.dim) && 
            this.cursor.checkOlds(coord);
    }
}

const directions = {
    "E": [0, 1],
    "S": [1, 0],
    "W": [0, -1],
    "N": [-1, 0]
}


module.exports = Board;
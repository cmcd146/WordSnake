const Cursor = require("./cursor")


class Board {
    constructor (dim) {
        this.dim = dim
        this.grid = Board.blankGrid(dim)
        this.cursor = new Cursor()
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

    render () {
        let html = "";

        for (let i = 0; i < this.dim; i++) {
            html += "<ul>";
            for (let j = 0; j < this.dim; j++) {
                if(this.checkCursor([i,j])){
                    html += "<li><p class='cursor'></p></li>"
                } else {
                    html += "<li></li>";
                }
            }
            html += "</ul>";
        }

        const figure = document.getElementById("word-snake-game");
        figure.innerHTML = html;
    }

    checkCursor(coor) {
        let currents = this.cursor.current;
        for(let i = 0; i < currents.length; i++) {
            let cursorCoor = currents[i];
            if (coor[0] == cursorCoor[0] && coor[1] == cursorCoor[1]){
                return true;
            }
        };
        return false;
    }

    validPosition(coord) {
        return (coord.x >= 0) && (coord.x < this.dim) &&
            (coord.y >= 0) && (coord.y < this.dim);
    }

}


module.exports = Board;
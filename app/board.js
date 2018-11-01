class Board {
    constructor (dim) {
        this.dim = dim
        this.grid = Board.blankGrid(dim)
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
                html += "<li></li>";
            }
            html += "</ul>";
        }

        const figure = document.getElementById("word-snake-game");
        figure.innerHTML = html;
    }

    validPosition(coord) {
        return (coord.x >= 0) && (coord.x < this.dim) &&
            (coord.y >= 0) && (coord.y < this.dim);
    }

}


module.exports = Board;
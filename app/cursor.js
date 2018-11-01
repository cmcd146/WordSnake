class Cursor {
    constructor(){
        this.currSpace = [0,0]
        this.currentWord = [];
        this.old = [];
        this.direction = "E";
    }

    addCurrent(coor) {
        this.currentWord.push(coor);
    }

    changeDir(dir) {
        this.direction = dir;
    }

    nextSpace() {
        this.currentWord.push(this.currSpace);
        this.currSpace = this.currSpace.map((num, idx) =>  num + directions[this.direction][idx])
    }

    backSpace() {
        this.currSpace = this.currentWord[this.currentWord.length - 1];
        this.currentWord = this.currentWord.slice(0,-1);
    }

    newTurn() {
        this.old = this.currentWord.slice(0, -2)
        this.currentWord = [this.currentWord[-1]];
    }
}

const directions = {
    "E": [0,1],
    "S": [1,0],
    "W": [0,-1],
    "N": [-1,0]
}

module.exports = Cursor;
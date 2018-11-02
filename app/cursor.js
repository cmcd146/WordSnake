class Cursor {
    constructor(){
        this.currSpace = [0,0];
        this.currWordCords = [];
        this.old = [];
        this.direction = "E";
    }

    addCurrent(coor) {
        this.currWordCords.push(coor);
    }

    changeDir(dir) {
        this.direction = dir;
    }

    nextSpace() {
        this.currWordCords.push(this.currSpace);
        this.currSpace = this.currSpace.map((num, idx) =>  num + directions[this.direction][idx])
    }

    nextSpaceCheck() {
        return this.currSpace.map((num, idx) => num + directions[this.direction][idx])
    }

    backSpace() {
        this.currSpace = this.currWordCords[this.currWordCords.length - 1];
        this.currWordCords = this.currWordCords.slice(0,-1);
    }

    newTurn() {
        this.old = this.currWordCords;
        this.currWordCords = [this.currWordCords.slice(-1)];
    }
}

const directions = {
    "E": [0,1],
    "S": [1,0],
    "W": [0,-1],
    "N": [-1,0]
}

module.exports = Cursor;
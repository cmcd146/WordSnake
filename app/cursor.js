// Cursore class that keeps track of where the player currently is and where they have been
class Cursor {
    constructor() {
        this.currSpace = [0, 0];
        this.currWordCords = [];
        this.old = [];
        this.direction = "E";
        this.lastDir = "";
    }

    // move cursor forward when a user adds a letter.
    nextSpace() {
        this.currWordCords.push(this.currSpace);
        this.currSpace = this.currSpace.map(
            (num, idx) => num + directions[this.direction][idx]
        );
    }

    // logic to move cursor once a user completes a word
    changeDir() {
        // find and delete options to move in the same direction or back the way you came
        let old_dir_idx = Object.keys(directions).indexOf(this.direction);
        let new_directions = Object.keys(directions);
        old_dir_idx = Object.keys(directions).indexOf(this.direction);
        new_directions.splice((old_dir_idx + 2) % 4, 1);
        old_dir_idx = new_directions.indexOf(this.direction);
        new_directions.splice(old_dir_idx, 1);
        this.lastDir = this.direction;

        // randomly chooses a diection from available directions
        this.temp_dir =
            new_directions[Math.floor(Math.random() * new_directions.length)];
        this.currSpace = this.currWordCords[this.currWordCords.length - 1].map(
            (num, idx) => num + directions[this.temp_dir][idx]
        );
    }

    // logic when a player hits backspace
    backSpace() {
        this.currSpace = this.currWordCords[this.currWordCords.length - 1];
        this.currWordCords = this.currWordCords.slice(0, -1);
    }

    // logic when a player submits a valid word
    newTurn() {
        this.old = this.old.concat(this.currWordCords);
        this.currWordCords = this.currWordCords.slice(-1);
        this.changeDir();
    }

    // check if coordinate is already been taken by a letter
    checkOlds(coor) {
        for (let i = 0; i < this.old.length; i++) {
            if (coor[0] == this.old[i][0] && coor[1] == this.old[i][1]) {
                return false;
            }
        }
        return true;
    }

    
    // check if coordinate is already been taken by a letter (useful for board checking if cursor is trapped, ends game)
    checkCurr(coor) {
        for (let i = 0; i < this.currWordCords.length; i++) {
            if (
                coor[0] == this.currWordCords[i][0] &&
                coor[1] == this.currWordCords[i][1]
            ) {
                return false;
            }
        }
        return true;
    }

    // change cursor position when user hits an arrow key
    arrowKeyPress(dir) {
        return this.currWordCords[this.currWordCords.length - 1].map(
            (num, idx) => num + directions[dir][idx]
        );
    }
}

const directions = {
    "E": [0,1],
    "S": [1,0],
    "W": [0,-1],
    "N": [-1,0]
}

module.exports = Cursor;
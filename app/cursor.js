class Cursor {
    constructor(){
        this.currSpace = [0,0];
        this.currWordCords = [];
        this.old = [];
        this.direction = "E";
        this.lastDir = "";
    }

    nextSpace() {
        this.currWordCords.push(this.currSpace);
        this.currSpace = this.currSpace.map((num, idx) =>  num + directions[this.direction][idx])
    }
    
    changeDir() {
        let old_idx = Object.keys(directions).indexOf(this.direction);
        let new_directions = Object.keys(directions);
        old_idx = Object.keys(directions).indexOf(this.direction);
        new_directions.splice(old_idx, 1);
        this.lastDir = this.direction;
        while(this.lastDir == this.direction){
            this.direction = _.sample(new_directions);
        }
        this.currSpace = this.currWordCords[this.currWordCords.length - 1]
            .map((num, idx) =>  num + directions[this.direction][idx]);
    }

    nextSpaceCheck() {
        return this.currSpace.map((num, idx) => num + directions[this.direction][idx])
    }

    backSpace() {
        this.currSpace = this.currWordCords[this.currWordCords.length - 1];
        this.currWordCords = this.currWordCords.slice(0,-1);
    }
    

    newTurn() {
        this.old = this.old.concat(this.currWordCords);
        this.currWordCords = this.currWordCords.slice(-1);
        this.changeDir();
    }

    checkOlds(coor) {
        for(let i = 0; i < this.old.length; i++) {
            if(coor[0] == this.old[i][0] && coor[1] == this.old[i][1]){
                return false;
            }
        };
        return true;
    }

    arrowKeyPress(dir) {
        return this.currWordCords[this.currWordCords.length - 1]
            .map((num, idx) => num + directions[dir][idx]);
    }

}

const directions = {
    "E": [0,1],
    "S": [1,0],
    "W": [0,-1],
    "N": [-1,0]
}

module.exports = Cursor;
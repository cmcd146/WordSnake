class Cursor {
    constructor(){
        this.current = [[0,0]]
        this.direction = "E"
    }

    addCurrent (coor) {
        this.current.push(coor);
    }
}

module.exports = Cursor;
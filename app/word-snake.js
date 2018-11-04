const Board = require("./board");

class WordSnake {
    constructor() {
        this.board = new Board(10);
        this.cursor = this.board.cursor;
        this.currWord = "";
        this.strikes = 0;
        this.score = 0;
        this.handleKeydown = this.handleKeydown.bind(this);
        document.addEventListener('keydown', this.handleKeydown)
        this.responseCb = this.responseCb.bind(this);
    }

    checkOver() {
        console.log(this.strikes)
        if (this.strikes == 3) {
            console.log("returned true")
            return true;
        }
        if (this.board.checkOver()) {
            return true;
        }
        return false;
    }

    checkWord(cb) {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {

            if (xhr.status >= 200 && xhr.status < 300) {
                cb(xhr.response.original == xhr.response.suggestion)
            } 
        };

        xhr.responseType = "json";
        xhr.open("GET", `https://montanaflynn-spellcheck.p.mashape.com/check/?text=${this.currWord.toLowerCase()}`);
        xhr.setRequestHeader("X-Mashape-Key", "4ZMGAD2sBWmsh4GlIez63YWuTgbZp1Rg1r0jsnSuF6KXIpznDQ");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();
    }

    responseCb(bool) {
        if (bool) {

            this.score += this.currWord.length;
            this.currWord = this.board.letters[this.cursor.currWordCords.slice(-1).toString()];
            this.updateScore();
            this.board.newTurn();
            this.board.render();

        } else {

            this.strikes += 1;

            if(this.strikes < 3) {
            
                const html = document.getElementsByClassName("content")[0];

                let warning = document.createElement("P");
                warning.className = "warning";
                
                var newContent = document.createTextNode("Not a word. +1 Strike");
                warning.appendChild(newContent); 

                document.body.insertBefore(warning, html); 
                this.board.render();
                
            };
            
            let letters =  document.getElementsByClassName("cursor-word")
            
            Array.from(letters).forEach(letter => {
                letter.className = "cursor-word wrong";
            });
            
        }
        if (this.checkOver()) {
            this.endGame();
        };
    }

    updateScore(){
        document.getElementsByClassName("number")[0].innerHTML = this.score;
    }

    handleKeydown(e) {

        if (e.keyCode >= 65 && e.keyCode <= 90 && this.board.validPosition(this.cursor.currSpace)) {

            // letter key is pressed
            this.currWord += keybinds[e.keyCode];
            let letter = keybinds[e.keyCode]
            this.board.letters[this.cursor.currSpace.toString()] = letter;
            this.cursor.nextSpace();

        } else if (e.keyCode == 8 && (this.currWord != '' && this.currWord.length != 1)) {

            // delete key is pressed
            this.currWord = this.currWord.slice(0, -1);
            this.cursor.backSpace();

        } else if (e.keyCode == 13) {
            // enter key is pressed
            
            //remove past warning if posted
            let warning = document.getElementsByClassName("warning")[0];
            if (warning) {
                warning.remove();
            }

            if (this.currWord.length > 1) {
                // with correct length word

                this.checkWord(this.responseCb);
            } else {
                // with incorrect length

                const html = document.getElementsByClassName("content")[0];
                
                let warning = document.createElement("P");
                warning.className = "warning wrong-length";
                
                var newContent = document.createTextNode("Word must be at least 2 letters long.");
                warning.appendChild(newContent);
                
                document.body.insertBefore(warning, html); 
            }
        } else if (e.keyCode >= 37 && e.keyCode <= 40 && this.currWord.length == 1) {

            // directional arrow is pressed
            this.board.arrowKeyPress(keybinds[e.keyCode]);

        }

        this.board.render();
    }

    removeWarning() {
        //remove past warning if posted
        let warning = document.getElementsByClassName("warning")[0];
        if (warning) {
            warning.remove();
        }
    }

    endGame() {
        document.removeEventListener("keydown", this.handleKeydown);
        
        const html = document.getElementsByClassName("content")[0];

        let warning = document.createElement("P");
        warning.className = "warning game-over";

        var newContent = document.createTextNode("Third Strike. Game Over.");
        warning.appendChild(newContent);

        document.body.insertBefore(warning, html);
    };
}



let keybinds = {
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    37: "W",
    38: "N",
    39: "E",
    40: "S"

}

module.exports = WordSnake;
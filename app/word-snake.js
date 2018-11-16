const Board = require("./board");

// Actual game class
class WordSnake {

    constructor() {

        this.board = new Board(10);
        this.cursor = this.board.cursor;
        this.currWord = "";
        this.strikes = 0;
        this.score = 0;

        this.toggleDirections = this.toggleDirections.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.responseCb = this.responseCb.bind(this);

        this.addButtonHandlers();
        document.addEventListener("keydown", this.handleKeydown);
    }

    // adds, button handlers at begining of game
    addButtonHandlers() {
        let dir_but = document.getElementsByClassName("directions-button")[0];
        dir_but.addEventListener("click", this.toggleDirections);
    }

    toggleDirections(e) {
        let directions = document.getElementsByClassName("hidden-directions")[0];
        if(directions){
            directions.className = "show-directions";
        } else {
            directions = document.getElementsByClassName("show-directions")[0];
            directions.className = "hidden-directions";
        }
    }

    // event handler callback that reacts to keypresses from user
    handleKeydown(e) {

        if (e.keyCode >= 65 && e.keyCode <= 90 && this.board.validPosition(this.cursor.currSpace)) {

            // letter key is pressed
            this.currWord += keybinds[e.keyCode];
            let letter = keybinds[e.keyCode];
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

    //check users word against dictionary API and send boolean to callback
    checkWord(cb) {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {

            if (xhr.status >= 200 && xhr.status < 300) {
                cb(xhr.response.original == xhr.response.suggestion);
            } 
        };

        xhr.responseType = "json";
        xhr.open("GET", `https://montanaflynn-spellcheck.p.mashape.com/check/?text=${this.currWord.toLowerCase()}`);
        xhr.setRequestHeader("X-Mashape-Key", "4ZMGAD2sBWmsh4GlIez63YWuTgbZp1Rg1r0jsnSuF6KXIpznDQ");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send();
    }

    // manipulate game based on whether the user's word is valid.
    responseCb(bool) {

        // if word is valid, update score, reset cursor, change direction, and rerender board
        if (bool) {

            this.score += this.currWord.length;
            this.currWord = this.board.letters[this.cursor.currWordCords.slice(-1).toString()];
            this.updateScore();

            // check if the game is over and end the game if it is.
            if (this.checkOver()) {
                this.endGame();
            } else {
                this.board.newTurn();
            };

            this.board.render();

        // if word invalid, add strike and message to user
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
                
            } else {
                this.endGame();
            };
            
            let letters =  document.getElementsByClassName("cursor-word");
            
            Array.from(letters).forEach(letter => {
                letter.className = "cursor-word wrong";
            });
            
        }  
    }

    // change score html element to new score
    updateScore(){
        document.getElementsByClassName("number")[0].innerHTML = this.score;
    }

    //remove past warning if posted
    removeWarning() {
        let warning = document.getElementsByClassName("warning")[0];
        if (warning) {
            warning.remove();
        }
    }

    //return true if game is over
    checkOver() {
        if (this.strikes == 3) {
            return true;
        }
        if (this.board.checkOver()) {
            return true;
        }
        return false;
    }

    // if game is over, remove event listener and display message to user.
    endGame() {
        document.removeEventListener("keydown", this.handleKeydown);
        
        const html = document.getElementsByClassName("content")[0];

        let warning = document.createElement("P");
        
        let newContent;
        if(this.strikes == 3) {
            warning.className = "warning game-over";
            newContent = document.createTextNode("Third Strike. Game Over.");
        } else {
            warning.className = "warning trap";
            newContent = document.createTextNode("You're trapped. Game Over.");
        }
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
};

module.exports = WordSnake;
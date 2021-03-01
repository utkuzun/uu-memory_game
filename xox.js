
const containerXox = document.querySelector(".container-xox");
const sw2 = document.querySelector(".switch2");
const winStats = document.querySelector(".time2 .time_cont");


createBoard()


class Player {

    constructor(letter) {
        this.letter = letter;
    }

    player_move() {
        return
    }
}

class humanPlayer extends Player {
    constructor(letter) {
        super(letter);
    }
    player_move(game) {
        return
    }
}


function humanPlayerMove(e) {

    if (!game.currentWinner) {
        if (isXTurn) {
            const id = e.currentTarget.dataset.id;
            disableXoxCard(id);
            game.make_move("X", parseInt(id))
            sw2.classList.add("left");
            isXTurn = false
        }
    
        if (game.empty_square() > 0) {

            if ((!game.currentWinner) && (!isXTurn)) {
                let square = oPlayer.player_move(game);
                isXTurn = true
                setTimeout(() => {
                    game.make_move("O", parseInt(square));
                    
                    sw2.classList.remove("left");
                }, 500)
            
            }

        }
        


    }

}



class randomCompPlayer extends Player {
    constructor(letter) {
        super(letter);
    }

    player_move(game) {
        const square = Math.floor(Math.random() * game.available_moves().length)
        disableXoxCard(game.available_moves()[square].toString());
        return game.available_moves()[square]
    }
}


class TicTacToe {

    constructor() {

        this.currentWinner = null;
    }

    available_moves() {
        let places = containerXox.querySelectorAll(".xox_card");

        let emptyArray = [];
        places.forEach(function (place) {

            const text = place.querySelector(".letter").textContent;
            if (text === " ") {
                emptyArray.push(place.dataset.id);
            }
        })
        return emptyArray
    }

    make_move(letter, square) {

        const places = containerXox.querySelectorAll(".xox_card");

        places.forEach(place => {
            if (parseInt(place.dataset.id) === square) {
                place.querySelector(".letter").textContent = letter
            }
        });

        if (this.winner()) {
            this.currentWinner = letter
            localStorageOps(letter)
        }

        if (this.empty_square() === 0 && !this.winner()) {
            localStorageOps("T")
        }
    }

    winner() {
        const places = containerXox.querySelectorAll(".xox_card");


        let itemArray = []

        places.forEach(function (place) {
            const id = place.dataset.id;
            const square = place.querySelector(".letter").textContent;
            itemArray.push({ id, square })
        })

        /* rows */

        for (var row of range(0, 9, 3)) {
            let tempArray = [itemArray[row].square, itemArray[row + 1].square, itemArray[row + 2].square];

            if ((tempArray.every(checkO)) || (tempArray.every(checkX))) {
                return true
            }
        }


        /* columns */

        for (var row of range(0, 3, 1)) {
            let tempArray = [itemArray[row].square, itemArray[row + 3].square, itemArray[row + 6].square];
            if ((tempArray.every(checkO)) || (tempArray.every(checkX))) {
                return true
            }
        }

        /* diagonals */

        let diaognal1 = [itemArray[0].square, itemArray[4].square, itemArray[8].square];
        if ((diaognal1.every(checkO)) || (diaognal1.every(checkX))) {
            return true
        }

        let diaognal2 = [itemArray[2].square, itemArray[4].square, itemArray[6].square];
        if ((diaognal2.every(checkO)) || (diaognal2.every(checkX))) {
            return true
        }



    }

    empty_square() {

        const texts = containerXox.querySelectorAll(".letter");
        let count = 0;

        texts.forEach(text => {
            if (text.textContent === " ") {
                count += 1;
            }
        });
        return count
    }

}

function checkO(letter) {
    return letter == "O"
}
function checkX(letter) {
    return letter == "X" 
}


function range(start, end, interval) {
    let ans = [];

    for (var i = start; i < end; i += interval) {
        ans.push(i)
    }
    return ans
}


const game = new TicTacToe()
const xPlayer = new humanPlayer("X");
const oPlayer = new randomCompPlayer("O");
let isXTurn = true


function createBoard() {
    for (var i = 1; i <= 9; i += 1) {

        let card = document.createElement("div")
        card.setAttribute("data-id", `${i}`)
        card.classList.add("xox_card")

        let text = document.createElement("h3")
        text.textContent = " "
        text.classList.add("letter")
        card.appendChild(text)

        card.addEventListener("click", humanPlayerMove)

        containerXox.appendChild(card)
    }

}


function disableXoxCard(move) {
    let places = containerXox.querySelectorAll(".xox_card");

    places.forEach(function (place) {

        if (place.dataset.id === move) {
            place.removeEventListener("click", humanPlayerMove)
        }
    })
}

function localStorageOps(winFlag) {

    addToLocalStorageXox(winFlag);
}

function addToLocalStorageXox(winflag) {
    let stats = getScoreLocalXox()

    if (stats.length === 0){
        stats = {
            "X" : 0,
            "O" : 0,
            "T" : 0
        }
    }

    if (winflag === "X") {
        stats.X += 1;
    } else if (winflag === "O") {
        stats.O += 1;
    } else {
        stats.T += 1;
    }

    localStorage.setItem("xox", JSON.stringify(stats));
    writeWinStats(stats)

}

function writeWinStats(stats) {
    winStats.textContent = `X: ${stats.X}, O: ${stats.O}, Tie: ${stats.T}`
}

function getScoreLocalXox() {
    return localStorage.getItem("xox") ? JSON.parse(localStorage.getItem("xox")) : [];
}
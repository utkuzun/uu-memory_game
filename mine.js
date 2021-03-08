const containerMine = document.querySelector(".container-mine");
const dimsizeForm = document.querySelector("#mine_form");
const dimsizeInput = document.querySelector(".dimsize_input");
const playMineBtn= document.querySelector(".play_mine");


// dimsizeForm.addEventListener("submit", takeDimsize);
dimsizeInput.addEventListener("keyup", createMineBoard);
playMineBtn.addEventListener("click", startGame);

let dimSize = 0;
let isMinesStarted = false;
let dug = [];


function startGame (e) {
    e.preventDefault();
    isMinesStarted = true;
}


function takeDimsize () {
    dimSize = parseInt(dimsizeInput.value);
}



function createMineBoard(dimsize) {

    takeDimsize();

    if (!isMinesStarted) {
        emptyBoard();
    }


    if ((dimSize < 11) && (!isMinesStarted)) {
        const mineBoard = createMineArray(dimSize); 
        appendBoard(mineBoard);
    }

}

appendBoard = (board) =>{

    for (row of range(0, dimSize, 1)) {
        for (col of range(0, dimSize, 1)) {

            let mineCard = document.createElement("div");
            mineCard.classList.add("mine-card");
            mineCard.setAttribute("data-id", `${format(row)} ${format(col)}`);
    
            let textMine = document.createElement("h3");
            textMine.classList.add("letter");

            if (board[row][col] === "0") {
                textMine.textContent = " "; 
            } else {
                textMine.textContent = `${board[row][col]}`;
            }
            
            containerSizes = containerMine.getBoundingClientRect().width;
            containerMine.style["grid-template-columns"] = `repeat(${dimSize}, 1fr)`;
            // mineCard.style["height"] = `${containerSizes / dimSize}px`;
            // mineCard.style["width"] = `${containerSizes / dimSize}px`;
            
            mineCard.appendChild(textMine);
            mineCard.addEventListener("click",dig);
            containerMine.appendChild(mineCard);
        }
    }
}


dig = (e) => {

    if ((isMinesStarted)) {
        let row, col;
        
        row = parseInt(e.currentTarget.dataset.id.slice(0, 2));
        col = parseInt(e.currentTarget.dataset.id.slice(3, 5));

        e.currentTarget.style["background-color"] = "#fff";
        e.currentTarget.firstElementChild.style["display"] = "inline";

        dug.push([row, col]);
        e.currentTarget.removeEventListener("click", dig);

        if(e.currentTarget.firstElementChild.textContent === " "){
            for (r of range(Math.max(0, row - 1), Math.min(dimSize -1, row +1) +1, 1)) {
                for(c of range(Math.max(0, col - 1), Math.min(dimSize -1, col +1) +1, 1)) {

                    if(dug.includes(Array(r, c))) {
                        continue;
                    }
                    let others = getOthers(`${format(r)} ${format(c)}`);
                    others.click();                                    
                }
            }
        } else if ((e.currentTarget.firstElementChild.textContent === "*")) {

            for (row of range(0, dimSize, 1)) {
                for (col of range(0, dimSize, 1)) {
                    let element = getOthers(`${format(row)} ${format(col)}`);
                    element.click();  
                }
            }
        }
    }


    if (dimSize ** 2 - dimSize === dug.length) {
        console.log("WİN")
    }
}

function getOthers(string) {
    const mineCards = document.querySelectorAll(".mine-card");
    let desire;

    mineCards.forEach((card) => {
        if (card.dataset.id === string) {
            desire = card;
        }        
    })

    return desire;
}

emptyBoard = () => {
    containerMine.innerHTML = " ";
}

createMineArray = (dimsize) => {
    let board = new Array(dimsize)

    // create a empty board array

    for(let i = 0; i < dimsize; i++) {
        board[i] = new Array(dimSize).fill(" ");
    } 

    // place random bombs
    appendBombs(dimsize, board);
    // place number indicates around bomb numbers
    appendNumbers(dimsize, board);
    return board;
}


appendNumbers = (dimsize, board) => {

    for (var row of range(0, dimsize, 1)) {
        for (var col of range(0, dimsize, 1)) {
            let bombNumber = 0;
            // console.log(row, col)
            // console.log(board.slice(Math.max(0, row - 1), Math.min(dimsize, row +1) +1 ))

            if((board[row][col] === " ")) {
                for(r of board.slice(Math.max(0, row - 1), Math.min(dimsize, row +1) +1 )) {
                    for(c of r.slice(Math.max(0, col - 1), Math.min(dimsize, col +1) +1 )) {
                        if (c === "*") {
                            bombNumber +=1
                        }
                    }
                }
                
                board[row][col] = `${bombNumber}`;
            }
        }
    }
}

appendBombs = (dimsize, board) => {

    let randomNumber = 0
    let i = 0;

    while (i < dimsize) {
        // pick a random number 
            randomNumber = Math.floor(Math.random() * (dimsize ** 2 - 1));
    
            let row = Math.floor(randomNumber / dimsize);
            let col = randomNumber % dimsize;
        // check bomb existing in this place
            if (!(board[row][col] === "*")) {
                board[row][col] = "*";
                i++;
            }
        }
}
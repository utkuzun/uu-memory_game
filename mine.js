const containerMine = document.querySelectorAll(".container-mine");
const dimsizeForm = document.querySelector("#mine_form");
const dimsizeInput = document.querySelector(".dimsize_input");
const playMineBtn= document.querySelector(".play_mine");


dimsizeForm.addEventListener("submit", takeDimsize);
dimsizeInput.addEventListener("keyup", createBoard);

let dimsize = 0

function takeDimsize (e) {
    e.preventDefault();
    dimSize = dimsizeInput.value;
}



function createMineBoard(dimsize) {

    const mineBoard = createMineArray(dimsize); 

    for(let i = 0; i < dimsize ** 2; i++) {
        
    }
}


createMineBoard = (dimsize) => {
    
}

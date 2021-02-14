

let numbers = [];

for (var i = 1; i <= 30 ; i++) {
    numbers.push(i);
}

numbers.sort(() => 0.5 - Math.random());



// get elements

const container30 = document.querySelector(".container-30")

// Dom loaded

document.addEventListener('DOMContentLoaded' , createNumberBoard(numbers));

// Game section

clickValue = 1;


function createNumberBoard (numbers) {
    numbers.forEach((number)=> {
        const card = document.createElement("div");
        card.classList.add("number-card");
    
        textNumber = document.createElement("h1");
        textNumber.textContent = number;
    
        card.setAttribute('data-id', `${number}`);
        card.appendChild(textNumber)
    
        container30.appendChild(card);

        card.addEventListener('click', checkCard);
    
    });
}


function checkCard(e) {
    selectedCard = this;
    

    let checking = parseInt(selectedCard.dataset.id) === clickValue;


    if (isGameStarted) {
        if (checking) {
            selectedCard.classList.add("blank");
            selectedCard.removeEventListener("click" , checkCard);
            selectedCard.classList.add("turned");
            clickValue += 1;
        }
    }

    if (clickValue === 31) {
        isGameOver = true
    }

}



const imgs = [
    {
        name: "utku",
        url: "img/utku.jpg"
    },
    {
        name: "utku",
        url: "img/utku.jpg"
    },
    {
        name: "berke",
        url: "img/berke.jpg"
    },
    {
        name: "berke",
        url: "img/berke.jpg"
    },
    {
        name: "serkan",
        url: "img/serkan.jpg"
    },
    {
        name: "serkan",
        url: "img/serkan.jpg"
    },
    {
        name: "emre",
        url: "img/emre.jpg"
    },
    {
        name: "emre",
        url: "img/emre.jpg"
    },
    {
        name: "göken",
        url: "img/göken.jpg"
    },
    {
        name: "göken",
        url: "img/göken.jpg"
    },
    {
        name: "murat",
        url: "img/murat.jpg"
    },
    {
        name: "murat",
        url: "img/murat.jpg"
    }
]


imgs.sort(() => 0.5 - Math.random());

// DOM loaded

const container = document.querySelector(".container");
const time = document.querySelector(".time")


let scoreText = 0;
let timeText = 0;



hasFlippedCard = false;
lockedBord = false;
let firstCard, secondCard;

document.addEventListener("DOMContentLoaded", createBoard);

function createBoard() {
    for (i = 0; i < imgs.length; i++) {
        var card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', `${imgs[i].name}`)
        var imgFront = document.createElement('img');
        imgFront.setAttribute('src', "img/mont.jpg");
        // img.setAttribute('data-id', i);
        imgFront.classList.add('img');
        imgFront.classList.add('front-img');

        var imgBack = document.createElement('img');
        imgBack.setAttribute('src', `${imgs[i].url}`);
        // img.setAttribute('data-id', i);
        imgBack.classList.add('back-img');
        imgBack.classList.add('img');

        card.appendChild(imgBack);
        card.appendChild(imgFront);

        container.appendChild(card);
        card.addEventListener('click', flipCard)
    }
}


// Game

function flipCard() {

    if (lockedBord) return;
    if(this===firstCard) return;
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkMatch();
}


function checkMatch() {

    isMatch = firstCard.dataset.id === secondCard.dataset.id;
    isMatch ? disableCards() : unFlippedCards();

    stopTime (isMatch);

}

function stopTime(bool) {
    if (bool) scoreText += 1;
    
    if(scoreText>imgs.length/2-1) { 
        clearInterval(timer)
        scoreMessage(timeText);
    }

    
}

function scoreMessage(timeText) {
    let highScore = getScoreLocal();
    if (timeText < highScore) {
        time.textContent = `Yay!! You've set new record with ${timeText}s`;
        addToLocalStorage(timeText);
    } else {
        time.textContent = `Your time is ${timeText}s. Record is ${highScore}s`
    }
}



function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard ();
}

function unFlippedCards() {
    lockedBord = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard ();
    }, 500);
}



function resetBoard () {
    [hasFlippedCard,lockedBord] = [false,false];
    [firstCard,secondCard] = [null,null];
}


let timer = setInterval(() => {
    timeText+=1;
    time.textContent = `${timeText}s`;
}, 1000);


// Local Storage

function getScoreLocal() {
    return localStorage.getItem("number") ? JSON.parse(localStorage.getItem("number")) : [];
}

function addToLocalStorage(score) {
    localStorage.setItem('number', JSON.stringify(score));
}
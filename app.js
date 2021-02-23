



const games = document.querySelectorAll(".game-tab");
const tabs = document.querySelector(".tabs");
const sw = document.querySelector(".switch");
const swButton = document.querySelector(".disp-btn");
const swButton2 = document.querySelector(".disp-btn2");
const playBTn = document.querySelector(".play");
const timeCont = document.querySelector(".time_cont");
const times = document.querySelector(".time");
const times2 = document.querySelector(".time2");


tabs.addEventListener("click", toggleTab);

swButton.addEventListener('click', function () {
    sw.classList.toggle("left");
    container.classList.toggle("none");
    container30.classList.toggle("hidden");
})

function toggleTab(e) {
    const id = e.target.dataset.id;

    games.forEach(function (game) {
        if (id) {
            if (game.dataset.id === id) {
                game.classList.remove("hide");
            } else game.classList.add("hide");
        }
    })

    let idname = currentTab()

    switchButtonBtns(idname);

}


function switchButtonBtns (idname) {
    if (idname === "XOX") {
        swButton.classList.add("hide")
        swButton2.classList.remove("hide")
        times.classList.add("hide")
        times2.classList.remove("hide")
    } else {
        swButton2.classList.add("hide")
        swButton.classList.remove("hide")
        times2.classList.add("hide")
        times.classList.remove("hide")
    }
}


// set the timer and time

let isGameStarted = false

playBTn.addEventListener("click", scoreOps)


// let scoreText = 0;
// let timeText = 0;

// let timer = setInterval(() => {
//     timeText+=1;
//     time.textContent = `${timeText}s`;
// }, 1000);



function scoreOps() {

    playBTn.removeEventListener("click", scoreOps);
    tabs.removeEventListener("click", toggleTab);

    isGameOver = false
    isGameStarted = true
    scoreNumber = 0
    let startTime = new Date().getTime();

    let timer = setInterval(() => {
        let currentTime = new Date().getTime();
        let t = currentTime - startTime;

        let [min, sec, ms] = getMinSec(t);

        locateInTime(min, sec, ms)

        checkStop(t,timer);

    }, 13);

}


function checkStop(t,timer) {

    let gameName = currentTab();

    if (isGameOver || (scoreNumber ==6)) {
        clearInterval(timer)
        scoreMessage(gameName, t)
        playBTn.addEventListener("click", scoreOps);
        tabs.addEventListener("click", toggleTab);
        isGameStarted = false;
    }
}


function scoreMessage(game_id, t) {

    let highScore = getScoreLocal(game_id);


    if (highScore.length === 0) {
        addToLocalStorage(game_id, t);
        highScore = getScoreLocal(game_id);
    }

    let [min, sec, ms] = getMinSec(t);
    let [hmin, hsec, hms] = getMinSec(highScore.t);


    if ((t <= highScore.t)) {   
        times.innerHTML = `<h3 class="result"><span class="time_cont result">Yay!! You've set new record with ${format(min)}:${format(sec)}:${format(ms)}</span></h3>`;
        addToLocalStorage(game_id, t);
    } else {
        times.innerHTML = `<h3 class="result"><span class="time_cont">Your time is ${format(min)}:${format(sec)}:${format(ms)}. Record is ${format(hmin)}:${format(hsec)}:${format(hms)}</span></h3>`
    }
}


function getMinSec(t) {
    let min = Math.floor(t / (1000 * 60));
    let sec = Math.floor((t % (60 * 1000)) / 1000);
    let ms = Math.floor((t % 100));

    return [min, sec, ms]
}



function locateInTime(min, sec, ms) {
    timeCont.textContent = `${format(min)}:${format(sec)}:${format(ms)}`;
}



function currentTab() {
    let idname
    games.forEach((game) => {
        if (!game.classList.contains("hide")) {
            idname = game.dataset.id;
        }
    })
    return idname
}

function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
}


// Local Storage

function getScoreLocal(game_id) {
    return localStorage.getItem(`${game_id}`) ? JSON.parse(localStorage.getItem(`${game_id}`)) : [];
}

function addToLocalStorage(game_id, t) {
    score = {game_id, t}
    localStorage.setItem(`${game_id}`, JSON.stringify(score));
}








let isCorrect = false;
let min =0,max=100,guess = 0;
let tries = 0;
const menuSection = document.getElementById('menu');
const guessSection = document.getElementById('guess');
const winSection = document.getElementById('win');
const timeSection = document.getElementById('time');
const guessField = document.querySelector('#guess article h2');
const triesField = document.querySelector('#win article p span');
const finalTimeField = document.getElementById('finalTime');
const footer = document.querySelector('footer');
// Botões de instruções/início
const correctBtn = document.getElementById('correct');
const lowerBtn = document.getElementById('lower');
const higherBtn = document.getElementById('higher');
const playAgainBtn = document.getElementById('playAgain');
const resetBtn = document.getElementById('reset');
//controle de eventos
let timesPressed = 0;
//cronometro
const minutesEl = document.querySelector("#minutes");
const secondsEl = document.querySelector("#seconds");
const millisecondsEl = document.querySelector("#milliseconds");

let interval;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isPaused = false;

let finalTimeStr;


// FUNÇÕES
function startTimer() {
    interval = setInterval(() =>{

        if (!isPaused) {
            
            milliseconds += 10

            if (milliseconds === 1000) {
                seconds++;
                milliseconds = 0;
            }

            if (seconds === 60) {
                minutes++;
                seconds = 0
            }

            minutesEl.textContent = formatTime(minutes);
            secondsEl.textContent = formatTime(seconds);
            millisecondsEl.textContent = formatMilliseconds(milliseconds);
        }
    },10);
}

function pauseTimer() {
    isPaused = true;
    finalTimeStr = formatTime(minutes) + ' minuto(s) e ' + formatTime(seconds) + ' segundo(s)';
}

function resetTimer() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    millisecondsEl.textContent = "00";
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}

function formatMilliseconds(time){
    return time < 100 ? `${time}`.padStart(3,"0") : time;
}

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessNumber(index){
    switch (index) {
        case 0:
            min = guess == 100 ? 100 : guess + 1;
            break;
        case 1:
            max = guess - 1;
            break;
    }
    
    guess = getRandomNumber(min,max)
    guessField.innerText = guess
    tries++;
}

function startGame(e){
    if (timesPressed == 0) {
        timesPressed++;

        menuSection.classList.add('hidden');
        footer.classList.add('hidden');
        guessSection.classList.remove('hidden');
        timeSection.classList.remove('hidden');
        guessNumber(3);
        startTimer();
    }
}


// EVENTOS
window.addEventListener('keydown',(e) =>{
    if (e.key == 'Enter') {
        startGame(e)
    }});
higherBtn.addEventListener('click',() => {guessNumber(0)});
lowerBtn.addEventListener('click',() => {guessNumber(1)});
correctBtn.addEventListener('click',() => {
    pauseTimer();
    guessSection.classList.add('hidden');
    winSection.classList.remove('hidden');
    timeSection.classList.add('hidden');
    triesField.innerText = tries;
    finalTimeField.innerText = finalTimeStr
})
playAgainBtn.addEventListener('click',()=>{
    resetTimer();
    isPaused = false;
    startTimer();
    winSection.classList.add('hidden');
    guessSection.classList.remove('hidden');
    timeSection.classList.remove('hidden');
    min=0;
    max=100;
    tries = 0;
    guessNumber(3);
})

resetBtn.addEventListener('click',()=>{
    location.reload();
    return false;
})


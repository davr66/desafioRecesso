let isCorrect = false;
let min =0,max=100,guess = 0;
let tentativa;
let menuSection = document.getElementById('menu');
let guessSection = document.getElementById('guess');
let guessField = document.querySelector('#guess article h2');
// Botões de instruções/início
let correctBtn = document.getElementById('correct');
let lowerBtn = document.getElementById('lower');
let higherBtn = document.getElementById('higher');

function getRandomNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessNumber(index){
    switch (index) {
        case 0:
            min = guess + 1;
            break;
        case 1:
            max = guess - 1;
            break;
    }
    guess = getRandomNumber(min,max)
    guessField.innerText = guess
    tentativa++;
}

window.addEventListener('keydown',(e) => {
    if (e.key == 'Enter') {
        menuSection.classList.add('hidden');
        guessSection.classList.remove('hidden');
        guessNumber(3);
    }
})

higherBtn.addEventListener('click',() => {guessNumber(0)});
lowerBtn.addEventListener('click',() => {guessNumber(1)});
correctBtn.addEventListener('click',() => {
    guessSection.style.display = 'none';
    winSection.classList.remove = 'hidden'
    winSection.style.display = 'flex';
})


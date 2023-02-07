const boxes = 9;
const grid = document.createElement('div');
grid.classList.add('grid');

for (let i = 0; i < boxes; i++) {
    const div = document.createElement('div');
    grid.appendChild(div);
}

document.getElementById("game").appendChild(grid);
const squares = document.querySelectorAll(".grid div");

squares.forEach( square => square.classList.add("square"))

for(i = 0 ; i < squares.length; i++){
    squares[i].setAttribute("id",i+1) 
}

const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score');

let result = 0;
let hitPositions;
let currentTime = 60;
let timerId = null;

function randomSquare() {
    squares.forEach( square => square.classList.remove('mole'));

    let randomSquare = squares[Math.floor(Math.random() * squares.length)]
    randomSquare.classList.add('mole');
    hitPositions = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', ()=> {
        if(hitPositions==square.id){
            result++;
            currentTime++;
            score.textContent = result;
            hitPositions = null;
        }
    });
})

function moveMole(){
    timerId = setInterval(randomSquare,500)
}

moveMole();

function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game over! Your final score is ' + result);
    }
}

let countDownTimerId = setInterval(countDown,1000)
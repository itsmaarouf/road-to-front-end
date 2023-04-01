const boxes = 9;
// create a div and save it in grid variable
const grid = document.createElement('div');
// add class "grid" to grid
grid.classList.add('grid');

// create all the necessary boxes 
for (let i = 0; i < boxes; i++) {
    const div = document.createElement('div');
    //and add them to the grid
    grid.appendChild(div);
}

// printing the boxes in the game
document.getElementById("game").appendChild(grid);
// select all the boxes and save them in the square variable
const squares = document.querySelectorAll(".grid div");

// add class "square" to every box in the game
squares.forEach(square => square.classList.add("square"))
// add id number to every box in the game
for (i = 0; i < squares.length; i++) {
    squares[i].setAttribute("id", i + 1)
}
// declare the variables
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left')
const score = document.querySelector('#score');

let result = 0;
let hitPositions;
let currentTime = 60;
let timerId = null;

// function to moving the active box randomly
function randomSquare() {
    squares.forEach(square => square.classList.remove('mole', 'fa-solid', 'fa-mosquito'));
    let randomSquare = squares[Math.floor(Math.random() * squares.length)]
    randomSquare.classList.add('mole', 'fa-solid', 'fa-mosquito', 'fa-9x');
    hitPositions = randomSquare.id;
}
// get plus point
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (hitPositions == square.id) {
            result++;
            currentTime++;
            score.textContent = result;
            hitPositions = null;
        }
    });
})
// moving the active box
function moveMole() {
    timerId = setInterval(randomSquare, 900)
}
// call moveMole function to move the active boxes
moveMole();
// countdown: if timer = 0 then the game is over
function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game over! Your final score is ' + result);
    }
}
// calling countDown function every 1 second
let countDownTimerId = setInterval(countDown, 1000)
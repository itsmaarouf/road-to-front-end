const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseBtn = document.querySelector('#start-pause');
const gameOver = document.querySelector('.gameOver');
const gridWidth = 9;
let score = 0;
const grid = document.querySelector('.grid');
let currentIndex = 76;
let timerId;
// game time
let gameTime = 60;
let currentTime = gameTime;
// to control the winning and losing
let controlTimerId;
// with Barriers function we are sure that the player will go up & down only
function Barriers(x) {
    return x % (Math.round(gridWidth / 2)) + 1
}
// Here we create cars to move them later
function CreateCars(x) {
    return x % (Math.round(gridWidth / 3)) + 1
}

// creating all the Blo| Score: cks inside the grid

for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridWidth; j++) {
        const div = document.createElement('div');
        grid.appendChild(div)
        if (i == 0 && j == 4) div.classList.add('ending-block', 'fa-solid', 'fa-tent');
        if (i == 0 || i == 1 || i == 4) div.classList.add('grass');
        if (i == 2) {
            div.classList.add('log-left');
            div.classList.add('l' + Barriers(j));
            if (div.classList.contains('l4') || div.classList.contains('l5')) div.classList.add('fa-solid', 'fa-hippo', 'fa-flip-horizontal');
        }
        if (i == 3) {
            div.classList.add('log-right');
            div.classList.add('l' + Barriers(j + 2));
            if (div.classList.contains('l4') || div.classList.contains('l5')) div.classList.add('fa-solid', 'fa-dragon');
        }
        if (i == 5) {
            div.classList.add('car-left');
            div.classList.add('c' + CreateCars(j));
            if (div.classList.contains('c1')) div.classList.add('fa-solid', 'fa-car-side', 'fa-flip-horizontal');

        }
        if (i == 6) {
            div.classList.add('car-right');
            div.classList.add('c' + CreateCars(j + 2));
            if (div.classList.contains('c1')) div.classList.add('fa-solid', 'fa-truck-fast');
        }

        if (i == 7 || i == 8) div.classList.add('theStart');

    }
}
// collect all the div elements under the grid element in squares variable
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

function moveFrog(e) {
    //removing the class frog from the grid element
    squares[currentIndex].classList.remove('frog', 'fa-solid', 'fa-frog');

    switch (e.key) {
        case 'ArrowLeft':
            //to not break the left border
            if (currentIndex % gridWidth != 0) currentIndex--;
            break;
        case 'ArrowRight':
            //to  not break the right border
            if (currentIndex % gridWidth < gridWidth - 1) currentIndex++;
            break;
        case 'ArrowUp':
            //to not break the upper border
            if (currentIndex >= gridWidth) currentIndex -= gridWidth;
            break;
        case 'ArrowDown':
            //to not break the bottom border
            if (currentIndex < squares.length - gridWidth) currentIndex += gridWidth;

        default:
            break;
    }
    //add the class frog from the grid element
    squares[currentIndex].classList.add('frog', 'fa-solid', 'fa-frog');
}
//add the class frog from the grid element
squares[currentIndex].classList.add('frog', 'fa-solid', 'fa-frog');

function autoMoveElement() {
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
    logsLeft.forEach(logsLeft => moveLogLeft(logsLeft));
    logsRight.forEach(logsRight => moveLogRight(logsRight));
    carsLeft.forEach(carsLeft => moveCarLeft(carsLeft));
    carsRight.forEach(carsRight => moveCarRight(carsRight));
}

function control() {
    lose();
    win();
}
// move hippo to the left side
function moveLogLeft(logsLeft) {
    for (let i = 1; i <= 5; i++) {
        if (logsLeft.classList.contains('l' + i)) {
            if (logsLeft.classList.contains('l4') || logsLeft.classList.contains('l5')) logsLeft.classList.remove('fa-solid', 'fa-hippo');
            logsLeft.classList.remove('l' + i++);
            if (i > 5) i = 1
            logsLeft.classList.add('l' + i);
            if (logsLeft.classList.contains('l4') || logsLeft.classList.contains('l5')) logsLeft.classList.add('fa-solid', 'fa-hippo', 'fa-flip-horizontal');
        }
    }
}
// move dragon to the right side
function moveLogRight(logsRight) {
    for (let i = 5; i >= 1; i--) {
        if (logsRight.classList.contains('l' + i)) {
            if (logsRight.classList.contains('l4') || logsRight.classList.contains('l5')) logsRight.classList.remove('fa-solid', 'fa-dragon');
            logsRight.classList.remove('l' + i--);
            if (i === 0) i = 5
            logsRight.classList.add('l' + i);
            if (logsRight.classList.contains('l4') || logsRight.classList.contains('l5')) logsRight.classList.add('fa-solid', 'fa-dragon');
        }
    }
}
// move cars to left side 
function moveCarLeft(carsLeft) {
    for (let i = 1; i <= 3; i++) {
        if (carsLeft.classList.contains('c' + i)) {
            if (carsLeft.classList.contains('c1')) carsLeft.classList.remove('fa-solid', 'fa-car-side');
            carsLeft.classList.remove('c' + i++);
            if (i > 3) i = 1
            carsLeft.classList.add('c' + i);
            if (carsLeft.classList.contains('c1')) carsLeft.classList.add('fa-solid', 'fa-car-side', 'fa-flip-horizontal');

        }
    }
}
// move truck to the right side   
function moveCarRight(carsRight) {
    for (let i = 3; i >= 1; i--) {
        if (carsRight.classList.contains('c' + i)) {
            if (carsRight.classList.contains('c1')) carsRight.classList.remove('fa-solid', 'fa-truck-fast');
            carsRight.classList.remove('c' + i--);
            if (i === 0) i = 3
            carsRight.classList.add('c' + i);
            if (carsRight.classList.contains('c1')) carsRight.classList.add('fa-solid', 'fa-truck-fast');
        }
    }
}
// check if player loses
function lose() {
    if (
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        squares[currentIndex].classList.contains('c1') ||
        currentTime === 0
    ) {
        gameOver.textContent = "Game over";
        clearInterval(timerId);
        clearInterval(controlTimerId);
        timerId, controlTimerId = null;
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        score++;
        resultDisplay.textContent = ' | Score: ' + score;
        squares[currentIndex].classList.remove('frog')
        currentTime = currentTime + 5;
        currentIndex = 76;
        squares[currentIndex].classList.add('frog', 'fa-solid', 'fa-frog')
    }
}
startPauseBtn.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(controlTimerId);
        timerId, controlTimerId = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        if (currentTime === 0) currentTime = --gameTime;
        // move cars & logs every second
        timerId = setInterval(autoMoveElement, 1000);
        // control winning and losing
        controlTimerId = setInterval(control, 40)
        // listen to the keyup event to move the frog 
        document.addEventListener('keyup', moveFrog);
    }
})
const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseBtn = document.querySelector('#start-pause');
const gridWidth = 9;
const grid = document.querySelector('.grid');

function Barriers(x) {
    return x % (Math.round(gridWidth / 2)) + 1
}

// creating all the Blocks inside the grid

for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridWidth; j++) {
        const div = document.createElement('div');
        grid.appendChild(div)
        if (i == 0 && j == 4) {
            div.classList.add('ending-block');
        }
        if (i == 2) {
            div.classList.add('log-left');
            div.classList.add('l' + Barriers(j));
        }
        if (i == 3) {
            div.classList.add('log-right');
            div.classList.add('l' + Barriers(j + 4));
        }
        if (i == 5) {
            div.classList.add('car-left');
        }
        if (i == 6) {
            div.classList.add('car-right');
        }

        if (i == 8 && j == 4) {
            div.classList.add('starting-block');
        }

    }
}
let currentIndex = 76;
// collect all the div elements under the grid element in squares variable
const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

function moveFrog(e) {
    //removing the class frog from the grid element
    squares[currentIndex].classList.remove('frog');

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
    squares[currentIndex].classList.add('frog');
}
//add the class frog from the grid element
squares[currentIndex].classList.add('frog');
// listen to the keyup event to move the frog 
document.addEventListener('keyup', moveFrog)

function autoMoveLogs() {
    logsLeft.forEach(logsLeft => moveLogLeft(logsLeft))
}

function moveLogLeft(logsLeft) {
    switch (true) {
        case logsLeft.classList.contains('l1'):
            logsLeft.classList.remove('l1');
            logsLeft.classList.add('l1');
            break;
    }
}

setInterval(autoMoveLogs, 1000)
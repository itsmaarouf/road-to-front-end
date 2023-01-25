const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseBtn = document.querySelector('#start-pause');
const gridWidth = 9;
const grid = document.querySelector('.grid');

function Barriers(x) {
    return x % (Math.round(gridWidth / 2)) + 1
}
function CreateCars(x) {
    return x % (Math.round(gridWidth / 3)) + 1
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
            div.classList.add('l' + Barriers(j));
        }
        if (i == 5) {
            div.classList.add('car-left');
            div.classList.add('c' + CreateCars(j));
        }
        if (i == 6) {
            div.classList.add('car-right');
            div.classList.add('c' + CreateCars(j));
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

function autoMoveElement() {
    logsLeft.forEach(logsLeft => moveLogLeft(logsLeft));
    logsRight.forEach(logsRight => moveLogRight(logsRight));
    carsLeft.forEach(carsLeft => moveCarLeft(carsLeft));
    carsRight.forEach(carsRight => moveCarRight(carsRight));
}
// move logs to the left side
function moveLogLeft(logsLeft) {
    /*switch (true) {
        case logsLeft.classList.contains('l1'):
            logsLeft.classList.remove('l1');
            logsLeft.classList.add('l2');
            break;
        case logsLeft.classList.contains('l2'):
            logsLeft.classList.remove('l2');
            logsLeft.classList.add('l3');
            break;
        case logsLeft.classList.contains('l3'):
            logsLeft.classList.remove('l3');
            logsLeft.classList.add('l4');
            break;
        case logsLeft.classList.contains('l4'):
            logsLeft.classList.remove('l4');
            logsLeft.classList.add('l5');
            break;
        case logsLeft.classList.contains('l5'):
            logsLeft.classList.remove('l5');
            logsLeft.classList.add('l1');
            break;
    }*/
    for (let i = 1; i <= 5; i++) {
        if (logsLeft.classList.contains('l' + i)) {
            logsLeft.classList.remove('l' + i++);
            if (i > 5) i = 1
            logsLeft.classList.add('l' + i);
        }
    }
}
// move logs to the right side
function moveLogRight(logsRight) {
    for (let i = 5; i >= 1; i--) {
        if (logsRight.classList.contains('l' + i)) {
            logsRight.classList.remove('l' + i--);
            if (i === 0) i = 5
            logsRight.classList.add('l' + i);
        }
    }
}
// move cars to left side 
function moveCarLeft(carsLeft) {
    for (let i = 1; i <= 3; i++) {
        if (carsLeft.classList.contains('c' + i)) {
            carsLeft.classList.remove('c' + i++);
            if (i > 3) i = 1
            carsLeft.classList.add('c' + i);
        }
    }
}
// move cars to the right side   
function moveCarRight(carsRight) {
    for (let i = 3; i >= 1; i--) {
        if (carsRight.classList.contains('c' + i)) {
            carsRight.classList.remove('c' + i--);
            if (i === 0) i = 3
            carsRight.classList.add('c' + i);
        }
    }
}
setInterval(autoMoveElement, 2000)

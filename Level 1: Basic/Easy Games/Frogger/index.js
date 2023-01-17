const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseBtn = document.querySelector('#start-pause');
const blocks = 9;
const grid = document.querySelector('.grid');

// creating all the blocks inside the grid

for (let i = 0; i < blocks; i++) {
    for (let j = 0; j < blocks; j++) {
        const div = document.createElement('div');
        grid.appendChild(div)
        if (i == 0 && j == 4) {
            div.classList.add('ending-block');
        }
        if (i == 2) {
            div.classList.add('log-left');
        }
        if (i == 3) {
            div.classList.add('log-right');
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
const squares = document.querySelectorAll('.grid div');

function moveFrog() {
    console.log('Frog moved');
}

document.addEventListener('keyup', moveFrog)
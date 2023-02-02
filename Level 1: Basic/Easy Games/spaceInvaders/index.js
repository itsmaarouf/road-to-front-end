const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.result');
let width = 15;
const totalSquares = 224
let currentShooterIndex = totalSquares - width - 8;
let direction = 1;
let invadersId;
let goingRight = true;

for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.add('invader');

    }
}

draw();

function removeDraw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader');

    }
}

squares[currentShooterIndex].classList.add('shooter')

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width != 0) currentShooterIndex--
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex++
            break;

    }
    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width == 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    removeDraw();
    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1;
            direction = -1;
            goingRight = false;
        }
    } else if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
    }
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    /*for (let i = 0; i < alienInvaders.length; i++) {
        if (rightEdge && goingRight) {
            alienInvaders[i] += width + 1;
            direction = -1;
            goingRight = false;
        } else if (leftEdge && !goingRight) {
            alienInvaders[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
        alienInvaders[i] += direction;
    }*/

    draw()

    function GameOver() {
        resultDisplay.innerHTML = 'GAME OVER!';
        clearInterval(invadersId);
        document.removeEventListener('keydown', moveShooter);
    }

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        GameOver()
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length - (width * 2)) {
            GameOver()
        }
    }

}
invadersId = setInterval(moveInvaders, 500)
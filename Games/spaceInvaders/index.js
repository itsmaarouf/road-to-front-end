const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.result');
let width = 15;
const totalSquares = 224
let currentShooterIndex = totalSquares - width - 8;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0;

// We create a space in which we will play
for (let i = 0; i < 225; i++) {
    const square = document.createElement('div');
    grid.appendChild(square)
}

// save all DIVs in Array 
const squares = Array.from(document.querySelectorAll('.grid div'))

// build alienInvaders
const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];
// draw invaders
function draw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader');
        }
    }
}

draw();

// remove invader
function removeDraw() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader');

    }
}

// add shooter to game
squares[currentShooterIndex].classList.add('shooter')

// move shooter
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
// waiting for any keydown events to move shooter
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
    // if it return true that mean the invaders in the left edge of the screen
    const leftEdge = alienInvaders[0] % width == 0;
    // if it return true that mean the invaders in the right edge of the screen
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    removeDraw();
    // check if Invaders in the left edge of the screen
    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            // move all the invaders down
            alienInvaders[i] += width + 1;
            // change the direction
            direction = -1;
            // change the value of goingRight because we going to left now
            goingRight = false;
        }
        // check if Invaders in the right edge of the screen
    } else if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            // move all the invaders down
            alienInvaders[i] += width - 1;
            // change the direction
            direction = 1;
            // change the value of goingRight because we going to left now
            goingRight = true;
        }
    }
    // change the direction of the invaders
    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }

    // draw the alien invaders
    draw()

    function GameOver() {
        grid.innerHTML = 'GAME OVER!';
        clearInterval(invadersId);
        document.removeEventListener('keydown', moveShooter);
        document.removeEventListener("keydown", shoot)
    }

    // When invaders hit, the shooter. lose players
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        GameOver()
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length - (width * 2)) {
            GameOver()
        }
        if (aliensRemoved.length === alienInvaders.length) {
            grid.innerHTML = 'YOU WIN!';
            clearInterval(invadersId);
            document.removeEventListener('keydown', moveShooter);
        }
    }

}
invadersId = setInterval(moveInvaders, 500)


function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.add('boom');

            setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300);
            clearInterval(laserId);

            const alienRemoval = alienInvaders.indexOf(currentLaserIndex);
            aliensRemoved.push(alienRemoval)
            results++
            resultDisplay.innerHTML = 'Your score is : ' + results;
            console.log(aliensRemoved)
        }
    }
    switch (e.key) {
        case "ArrowUp":
            laserId = setInterval(moveLaser, 100)
            break;
    }
}

document.addEventListener("keydown", shoot)
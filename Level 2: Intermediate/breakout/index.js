const grid = document.querySelector('.grid');
const score = document.querySelector('#score');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
let userScore = 0;
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballWidth = 20;
const userStart = [230, 10];
let currentPosition = userStart;
let timeId;
let xDirections = 2;
let yDirections = 2;

const ballStart = [270, 40];
let currentBallPosition = ballStart;
let ballSpeed = 40;

// class Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// all my Blocks
const Blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

// Create a block
function addBlock() {
    for (let i = 0; i < Blocks.length; i++) {
        const block = document.createElement('block');
        block.classList.add('block');
        block.style.left = Blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = Blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);

    }
}

addBlock()

// create a user

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

function drawBall() {
    ball.style.left = currentBallPosition[0] + 'px';
    ball.style.bottom = currentBallPosition[1] + 'px';
}

function MoveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] + blockWidth < boardWidth) {
                currentPosition[0] += 10
                drawUser();
            }
            break;
        case 'ArrowDown':
            if (currentPosition[1] > 10) {
                currentPosition[1] -= 10
                drawUser();
            }
            break;
        case 'ArrowUp':
            if (currentPosition[1] < 150) {
                currentPosition[1] += 10
                drawUser();
            }
            break;
    }
}


//
function startGame() {
    timeId = setInterval(moveBall, ballSpeed);
    document.addEventListener('keydown', MoveUser);
}

function pauseGame() {
    clearInterval(timeId)
    document.removeEventListener("keydown", MoveUser)
}

// create a ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall()
grid.appendChild(ball);

function moveBall() {
    currentBallPosition[0] += xDirections;
    currentBallPosition[1] += yDirections;
    drawBall();
    checkCollisions()
}


// check for collisions

function checkCollisions() {
    // check for block collisions
    for (let i = 0; i < Blocks.length; i++) {
        if (
            // checking if ball position between Block xAxis
            (currentBallPosition[0] > Blocks[i].bottomLeft[0] &&
                currentBallPosition[0] < Blocks[i].bottomRight[0]) &&
            // checking if ball position between Block yAxis
            ((currentBallPosition[1] + ballWidth) > Blocks[i].bottomLeft[1] &&
                currentBallPosition[1] < Blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            // remove class from Block
            allBlocks[i].classList.remove('block');
            // delete Block from Blocks array
            Blocks.splice(i, 1);
            // change Direction of ball
            yDirections *= -1;
            // add score to player
            userScore++;
            score.textContent = 'user score is: ' + userScore;

            // check if player wins
            if (Blocks.length === 0) {
                score.textContent = "You win!";
                clearInterval(timeId)
                document.removeEventListener("keydown", MoveUser)
            }
        }

    }

    // check for user collisions
    if (
        (currentBallPosition[0] > currentPosition[0] &&
            currentBallPosition[0] < currentPosition[0] + blockWidth) &&
        (currentBallPosition[1] > currentPosition[1] &&
            currentBallPosition[1] < currentPosition[1] + blockHeight)
    ) {
        // change Direction of ball
        yDirections *= -1;
    }

    // check for wall collisions
    if (currentBallPosition[0] === boardWidth - ballWidth) {
        xDirections = -2
    } else if (currentBallPosition[0] === 0) {
        xDirections = 2
    } else if (currentBallPosition[1] === 0) {
        yDirections = 2;
    } else if (currentBallPosition[1] === boardHeight - ballWidth) {
        yDirections = -2;
    }

    // check Game Score
    if (currentBallPosition[1] === 0) {
        clearInterval(timeId);
        grid.textContent = "Game Score";
        document.removeEventListener("keydown", MoveUser)
    }
}



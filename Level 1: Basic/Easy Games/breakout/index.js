const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const userStart = [230, 10];
let currentPosition = userStart;
let timeId;

const ballStart = [270, 40];
let currentBallPosition = ballStart;

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

document.addEventListener('keydown', MoveUser);

// create a ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall()
grid.appendChild(ball);


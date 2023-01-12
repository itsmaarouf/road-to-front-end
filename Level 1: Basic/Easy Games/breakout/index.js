const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;

const userStart = [230, 10];
let currentPosition = userStart;

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

console.log(2 + 2 + 3);
console.log(Blocks[0])

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
user.style.left = currentPosition[0] + 'px';
user.style.bottom = currentPosition[1] + 'px';
grid.appendChild(user);
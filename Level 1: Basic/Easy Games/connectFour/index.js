const gridWidth = 7
const grid = document.querySelector('.grid');

// building the game structure
for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridWidth; j++) {
        const box = document.createElement('div');
        grid.appendChild(box);
        if (i == (gridWidth - 1)) {
            box.classList.add('taken')
        }
    }
}

const squares = document.querySelectorAll('.grid div');
const result = document.querySelector('#result');
const displayCurrentPlayer = document.querySelector('#current-player');
let currentPlayer = 1;

function checkForWin() {
    // check for horizontal wins
    for (let i = 0; i < squares.length; i++) {
        let row = [i, i + 1, i + 2, i + 3];
        if (row.every(index => squares[index].classList.contains('player-one'))) {
            result.textContent = 'Player One wins!';
            return;
        } else if (row.every(index => squares[index].classList.contains('player-two'))) {
            result.textContent = 'Player Two wins!';
            return;
        }
    }
}


for (let v = 0; v < squares.length; v++) {
    squares[v].onclick = () => {
        // if the square below your character is taking, you can go on top of it
        if (squares[v + 7].classList.contains('taken')) {
            if (currentPlayer == 1) {
                squares[v].classList.add('taken');
                squares[v].classList.add('player-one');
                currentPlayer = 2;
                displayCurrentPlayer.textContent = currentPlayer;
            } else {
                squares[v].classList.add('taken');
                squares[v].classList.add('player-two');
                currentPlayer = 1;
                displayCurrentPlayer.textContent = currentPlayer;
            }

        } else alert('you cannot play here');
        checkForWin()
    }

}
const gridWidth = 7
const grid = document.querySelector('.grid');

// building the game structure
for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridWidth; j++) {
        const box = document.createElement('div');
        grid.appendChild(box);
        if (i == (gridWidth - 1)) {
            box.classList.add('taken');
            box.style.display = "none";
        }
    }
}

const squares = document.querySelectorAll('.grid div');
const result = document.querySelector('#result');
const displayCurrentPlayer = document.querySelector('#current-player');
let currentPlayer = 1;

function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
        /*let emptySquares = 0;
        if (emptySquares != 0) break;*/
        // check for horizontal wins
        if ([0, 1, 2, 3].includes(i % 7)) {
            let row = [i, i + 1, i + 2, i + 3];
            if (row.every(index => squares[index].classList.contains('player-one'))) {
                result.textContent = 'Player One wins!';
                return;
            } else if (row.every(index => squares[index].classList.contains('player-two'))) {
                result.textContent = 'Player Two wins!';
                return;
            }
        }
        // check for vertical wins
        let column = [i, i + 7, i + 14, i + 21];
        if (column.every(index => squares[index].classList.contains('player-one'))) {
            result.textContent = 'Player One wins!';
            return;
        } else if (column.every(index => squares[index].classList.contains('player-two'))) {
            result.textContent = 'Player Two wins!';
            return;
        }
        // check for diagonal win 
        let diagonalRight = [i, i + 8, i + 16, i + 24];
        let diagonalLeft = [i, i + 6, i + 12, i + 18];
        if (diagonalRight.every(index => squares[index].classList.contains('player-one'))) {
            result.textContent = 'Player One wins!';
            return;
        } else if (diagonalRight.every(index => squares[index].classList.contains('player-two'))) {
            result.textContent = 'Player Two wins!';
            return;
        }
        if (diagonalLeft.every(index => squares[index].classList.contains('player-one'))) {
            result.textContent = 'Player One wins!';
            return;
        } else if (diagonalLeft.every(index => squares[index].classList.contains('player-two'))) {
            result.textContent = 'Player Two wins!';
            return;
        }
    }
}


for (let v = 0; v < squares.length; v++) {
    squares[v].onclick = () => {
        // if the square below your character is taking, you can go on top of it
        if (squares[v].classList.contains('taken')) {
            // With this IF statement we avoid two players choosing the same BOX
        } else if (squares[v + 7].classList.contains('taken')) {
            if (currentPlayer == 1) {
                console.log(v)
                squares[v].classList.add('taken');
                squares[v].classList.add('player-one');
                currentPlayer = 2;
                displayCurrentPlayer.textContent = currentPlayer;
            } else {
                console.log(v)
                squares[v].classList.add('taken');
                squares[v].classList.add('player-two');
                currentPlayer = 1;
                displayCurrentPlayer.textContent = currentPlayer;
            }

        } else alert('you cannot play here');
        checkForWin()
    }

}
// script.js

// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Get all cells and the restart button
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('#restart');

// Event listeners for cells
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Event listener for restart button
restartButton.addEventListener('click', restartGame);

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

// Update cell with the current player's symbol
function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Check the game result
function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        endGame(false);
        return;
    }

    if (!board.includes('')) {
        endGame(true);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// End the game
function endGame(draw) {
    gameActive = false;
    if (draw) {
        alert('Draw!');
    } else {
        alert(`Player ${currentPlayer} wins!`);
    }
}

// Restart the game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
    });
}

var board = document.querySelector('.velha');
var cells = document.querySelectorAll('.celula');
var currentPlayer = 'X';
var gameOver = false;

function handleCellClick() {
    if (gameOver) {
        return;
    }

    if (this.textContent !== '') {
        return;
    }

    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    if (checkWinner(currentPlayer)) {
        alert('Jogador ' + currentPlayer + ' venceu!');
        gameOver = true;
    } else if (checkTie()) {
        alert('Empate!');
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner(player) {
    var winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (var i = 0; i < winningCombinations.length; i++) {
        var [a, b, c] = winningCombinations[i];

        if (
            cells[a].textContent === player &&
            cells[b].textContent === player &&
            cells[c].textContent === player
        ) {
            return true;
        }
    }

    return false;
}

function checkTie() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].textContent === '') {
            return false;
        }
    }

    return true;
}

function resetGame() {
    currentPlayer = 'X';
    gameOver = false;

    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].classList.remove('X', 'O');
    }
}

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleCellClick);
}

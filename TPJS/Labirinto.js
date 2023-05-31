var maze = document.querySelector('.maze');
var cells = [];

var startCell;
var endCell;

var isMouseDown = false;
var isGameOver = false;

var gameOverMessage = document.querySelector('.game-over-message');
var victoryMessage = document.querySelector('.victory-message');

function createMaze() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('mousedown', handleCellMouseDown);
            cell.addEventListener('mouseover', handleCellMouseOver);
            cell.addEventListener('mouseup', handleCellMouseUp);
            maze.appendChild(cell);
            cells.push(cell);
        }
    }

  
    startCell = cells[0];
    endCell = cells[cells.length - 1];

    startCell.classList.add('start');
    endCell.classList.add('end');

    var trapCells = getRandomCells(10);

    for (var i = 0; i < trapCells.length; i++) {
        trapCells[i].classList.add('trap');
        trapCells[i].addEventListener('mouseover', handleTrapCellMouseOver);
    }
    endCell.addEventListener('mouseover', handleEndCellMouseOver);
}

function getRandomCells(num) {
    var randomCells = [];

    while (randomCells.length < num) {
        var randomIndex = Math.floor(Math.random() * cells.length);
        var randomCell = cells[randomIndex];

        if (!randomCell.classList.contains('start') && !randomCell.classList.contains('end') && !randomCell.classList.contains('trap')) {
            randomCells.push(randomCell);
        }
    }

    return randomCells;
}

function handleTrapCellMouseOver() {
    if (!isGameOver) {
        this.style.backgroundColor = 'orange';
        isGameOver = true;
        gameOverMessage.style.display = 'block';
    }
}

function handleCellMouseOver() {
    if (!isMouseDown && !isGameOver && this === endCell) {
        this.style.backgroundColor = 'green';
        isGameOver = true;
        victoryMessage.style.display = 'block';
    }
}



function handleCellMouseDown() {
    isMouseDown = true;

    if (this.classList.contains('wall')) {
        this.classList.remove('wall');
    } else if (this.classList.contains('trap')) {
        this.classList.remove('trap');
    } else {
        this.classList.add('wall');
    }
}

function handleEndCellMouseOver() {
    if (!isMouseDown && !isGameOver) {
        isGameOver = true;
        victoryMessage.style.display = 'block';
    }
}

function handleCellMouseUp() {
    isMouseDown = false;
}

function solveMaze() {
    resetMaze();

    var queue = [];
    var visited = new Set();

    queue.push(startCell);
    visited.add(startCell);

    while (queue.length > 0) {
        var currentCell = queue.shift();

        if (currentCell === endCell) {
            break;
        }

        var neighbors = getNeighbors(currentCell);

        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!visited.has(neighbor) && !neighbor.classList.contains('wall')) {
                queue.push(neighbor);
                visited.add(neighbor);
                neighbor.previous = currentCell;
            }
        }
    }

    var path = [];
    var cell = endCell;

    while (cell.previous !== undefined) {
        path.push(cell);
        cell = cell.previous;
    }

    path.push(startCell);
    path.reverse();

    for (var i = 0; i < path.length; i++) {
        path[i].classList.add('path');
    }

    if (path.includes(endCell)) {
        gameOver();
    }
}

function gameOver() {
    isGameOver = true;
    var gameOverMessage = document.querySelector('.game-over-message');
    gameOverMessage.style.display = 'block';
}

function getNeighbors(cell) {
    var index = cells.indexOf(cell);
    var neighbors = [];

    if (index - 8 >= 0) {
        neighbors.push(cells[index - 8]);
    }

    if (index + 8 < cells.length) {
        neighbors.push(cells[index + 8]); 
    }

    if (index % 8 !== 0) {
        neighbors.push(cells[index - 1]); 
    }

    if ((index + 1) % 8 !== 0) {
        neighbors.push(cells[index + 1]);
    }

    return neighbors;
}

function resetMaze() {
    isGameOver = false;
    var gameOverMessage = document.querySelector('.game-over-message');
    gameOverMessage.style.display = 'none';

    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove('wall', 'path', 'trap');
        delete cells[i].previous;
    }
}

createMaze();

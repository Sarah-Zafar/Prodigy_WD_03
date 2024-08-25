let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let boardState = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', handleBoxClick));
};

function handleBoxClick(e) {
    const id = e.target.id;

    if (!boardState[id]) {
        boardState[id] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.style.color = currentPlayer === X_TEXT ? '#FF69B4' : '#FF1493';

        if (checkForWinner()) {
            playerText.textContent = `${currentPlayer} wins! 🎉`;
            highlightWinningBoxes(checkForWinner());
            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkForWinner() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;

        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return combo;
        }
    }
    return false;
}

function highlightWinningBoxes(winningCombo) {
    winningCombo.forEach(index => {
        boxes[index].style.backgroundColor = 'var(--winning-blocks)';
    });
}

restartBtn.addEventListener('click', resetGame);

function resetGame() {
    boardState.fill(null);
    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = '';
    });
    playerText.textContent = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
}

startGame();

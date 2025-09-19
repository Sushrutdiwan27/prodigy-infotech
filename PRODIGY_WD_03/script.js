const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const aiStatusElement = document.getElementById("ai-status");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;
let vsAI = false;

// Create cells dynamically
function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleClick);
    boardElement.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.getAttribute("data-index");
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusElement.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    statusElement.textContent = "It's a Draw! 🤝";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusElement.textContent = `Player ${currentPlayer}'s Turn`;

  if (vsAI && currentPlayer === "O" && !gameOver) {
    setTimeout(aiMove, 500);
  }
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameOver = false;
  statusElement.textContent = "Player X's Turn";
  createBoard();
}

function toggleAI() {
  vsAI = !vsAI;
  aiStatusElement.textContent = vsAI ? "ON" : "OFF";
  resetGame();
}

function aiMove() {
  let emptyCells = board.map((val, idx) => val ? null : idx).filter(val => val !== null);
  if (emptyCells.length === 0) return;
  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[move] = "O";
  document.querySelector(`[data-index='${move}']`).textContent = "O";

  if (checkWin()) {
    statusElement.textContent = `Player O Wins! 🤖🎉`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    statusElement.textContent = "It's a Draw! 🤝";
    gameOver = true;
    return;
  }

  currentPlayer = "X";
  statusElement.textContent = `Player ${currentPlayer}'s Turn`;
}

createBoard();

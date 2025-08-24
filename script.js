const board = document.getElementById("board");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let cells = Array(9).fill(null);
let gameOver = false;

function createBoard() {
  board.innerHTML = "";
  cells.fill(null);
  gameOver = false;
  currentPlayer = "X";
  statusEl.textContent = "Vez do jogador: " + currentPlayer;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
  }
}

function handleClick(i) {
  if (cells[i] || gameOver) return;

  cells[i] = currentPlayer;
  board.children[i].textContent = currentPlayer;

  if (checkWin()) {
    statusEl.textContent = "Jogador " + currentPlayer + " venceu!";
    gameOver = true;
    return;
  }

  if (cells.every(cell => cell)) {
    statusEl.textContent = "Empate!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = "Vez do jogador: " + currentPlayer;
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // linhas
    [0,3,6],[1,4,7],[2,5,8], // colunas
    [0,4,8],[2,4,6]          // diagonais
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

resetBtn.addEventListener("click", createBoard);

createBoard();
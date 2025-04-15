const WORDS = ["apple", "brave", "chair", "delta", "eagle", "flame", "grape"];
const ANSWER = WORDS[Math.floor(Math.random() * WORDS.length)];
let currentRow = 0;
let currentGuess = "";

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");

function createBoard() {
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.id = `row-${i}`;
    for (let j = 0; j < 5; j++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.id = `tile-${i}-${j}`;
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

function createKeyboard() {
  const keys = "QWERTYUIOPASDFGHJKLZXCVBNM⌫⏎".split("");
  keys.forEach(key => {
    const button = document.createElement("button");
    button.textContent = key;
    button.className = "key";
    button.onclick = () => handleKey(key);
    keyboard.appendChild(button);
  });
}

function handleKey(key) {
  if (key === "⌫") {
    if (currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, -1);
      updateTiles();
    }
  } else if (key === "⏎") {
    if (currentGuess.length === 5) {
      checkGuess();
    }
  } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
    currentGuess += key.toLowerCase();
    updateTiles();
  }
}

function updateTiles() {
  for (let i = 0; i < 5; i++) {
    const tile = document.getElementById(`tile-${currentRow}-${i}`);
    tile.textContent = currentGuess[i] ? currentGuess[i].toUpperCase() : "";
  }
}

function checkGuess() {
  const row = document.getElementById(`row-${currentRow}`);
  const guess = currentGuess.split("");

  guess.forEach((letter, i) => {
    const tile = document.getElementById(`tile-${currentRow}-${i}`);
    if (letter === ANSWER[i]) {
      tile.classList.add("correct");
    } else if (ANSWER.includes(letter)) {
      tile.classList.add("present");
    } else {
      tile.classList.add("absent");
    }
  });

  if (currentGuess === ANSWER) {
    setTimeout(() => alert("🎉 You guessed it!"), 100);
    return;
  }

  currentRow++;
  currentGuess = "";

  if (currentRow >= 6) {
    setTimeout(() => alert(`😢 Game over! The word was: ${ANSWER}`), 100);
  }
}

createBoard();
createKeyboard();

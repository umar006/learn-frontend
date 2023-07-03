function getComputerChoice() {
  const items = ["rock", "paper", "scissors"];
  return items[Math.floor(Math.random() * items.length)];
}

function playRound(playerSelection, computerSelection) {
  const sanitized = playerSelection.toLowerCase();

  const playerWin =
    (sanitized === "rock" && computerSelection === "scissors") ||
    (sanitized === "paper" && computerSelection === "rock") ||
    (sanitized === "scissors" && computerSelection === "paper");
  if (playerWin)
    return {
      win: true,
      draw: false,
      desc: `You Win! ${sanitized} beats ${computerSelection}`,
    };

  const computerWin =
    (computerSelection === "rock" && sanitized === "scissors") ||
    (computerSelection === "paper" && sanitized === "rock") ||
    (computerSelection === "scissors" && sanitized === "paper");
  if (computerWin)
    return {
      win: false,
      draw: false,
      desc: `You Lose! ${computerSelection} beats ${sanitized}`,
    };

  if (sanitized === computerSelection)
    return {
      win: false,
      draw: true,
      desc: "Draw!",
    };
}

let playerScore = 0;
let computerScore = 0;
function game(e) {
  const playerSelection = e.target.innerText;
  const computerSelection = getComputerChoice();

  const result = playRound(playerSelection, computerSelection);

  if (result.win) {
    playerScore += 1;
  } else if(!result.win && !result.draw) {
    computerScore += 1;
  }

  console.log({playerScore, computerScore})

  const showResult = document.createElement("p");
  showResult.textContent = result.desc;

  const board = document.querySelector(".board");
  board.insertBefore(showResult, board.firstChild);

  const finalResult = document.createElement("p");
  finalResult.style.fontWeight = "bold";
  if (playerScore === 5) {
    finalResult.textContent = "Player Win!";
    finalResult.style.border = "3px solid red";
    board.insertBefore(finalResult, board.firstChild);

    document.body.removeEventListener("click", game);
  } else if (computerScore === 5) {
    finalResult.textContent = "Computer Win!";
    finalResult.style.border = "3px solid blue";
    board.insertBefore(finalResult, board.firstChild);

    document.body.removeEventListener("click", game);
  }

  document.body.appendChild(board);
}

document.body.addEventListener("click", game);

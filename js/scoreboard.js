let scoreStorageArray = JSON.parse(localStorage.scoreList) || [];
let playedGames = 0;
let gamesWon = 0;
let gamesLost = 0;

function saveToScoreBoard() {
  const inputValue = inputTextFieldElement.value;

  if (inputValue !== "") {
    let score = {
      text: inputValue,
    };
    scoreStorageArray.push(score);
    localStorage.scoreList = JSON.stringify(scoreStorageArray);

    createFlexScoreBoardElements(score);
    inputTextFieldElement.value = "";
  }

  createScoreBoardElements();
}

function deleteScoreBoard() {}

function createScoreBoardElements() {
  const scoreBoardElement = document.getElementById("scoreboard");
  const ulElement = document.createElement("ul");
  const liElement = document.createElement("li");

  const gamesPlayedElement = document.createElement("p");
  gamesPlayedElement.innerText = "Games Played: " + playedGames;
  const gamesWonElement = document.createElement("p");
  gamesWonElement.innerText = "WIN: " + gamesWon;
  const gamesLostElement = document.createElement("p");
  gamesLostElement.innerText = "LOSS: " + gamesLost;

  scoreBoardElement.appendChild(ulElement);
  ulElement.appendChild(liElement);
  liElement.appendChild(gamesPlayedElement);
  liElement.appendChild(gamesWonElement);
  liElement.appendChild(gamesLostElement);
}

export { saveToScoreBoard, deleteScoreBoard, createScoreBoardElements };

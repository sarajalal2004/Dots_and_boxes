// SARA JALAL ALI ALKHOZAAE
// 11/9/2025 - 18/9/2025
// Digitalize the famous Dots and Boxes game

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Global variables /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// players variables - containing scores, turn, names - ////////////////////////////
let players = [
  {
    playerName: sessionStorage.getItem("playerName1"),
    playerNameDisplay: document.querySelector("#playerName1"),
    playerScore: 0,
    playerScoreDisplay: document.querySelector("#playerScore1"),
    color: "lightcoral",
  },
  {
    playerName: sessionStorage.getItem("playerName2"),
    playerNameDisplay: document.querySelector("#playerName2"),
    playerScore: 0,
    playerScoreDisplay: document.querySelector("#playerScore2"),
    color: "blue",
  },
  {
    playerName: sessionStorage.getItem("playerName3"),
    playerNameDisplay: document.querySelector("#playerName3"),
    playerScore: 0,
    playerScoreDisplay: document.querySelector("#playerScore3"),
    playerDiv: document.querySelector("#player3"),
    color: "green",
  },
  {
    playerName: sessionStorage.getItem("playerName4"),
    playerNameDisplay: document.querySelector("#playerName4"),
    playerScore: 0,
    playerScoreDisplay: document.querySelector("#playerScore4"),
    playerDiv: document.querySelector("#player4"),
    color: "yellow",
  },
]
const numberOfPlayers = parseInt(sessionStorage.getItem("numberOfPlayers"))
let turnIndex = 0

//////////////////////////// game variables - containing dimensions and counts - ////////////////////////////
const width = parseInt(sessionStorage.getItem("boardDimension")[1]) // number of boxes columns
const height = parseInt(sessionStorage.getItem("boardDimension")[0]) // number of boxes rows
let choiceCount = 0 // count the number of selected borders
const line = 2 * width + 1 // number of borders associate to line of boxes ignoring the bottom borders
const numberOfGridDivs = (2 * width + 1) * (2 * height + 1) // the number of all grid divs

////////////////////////// Other DOM objects variables - accessing DOM objects - ///////////////////////////
let borders // access the array of borders DOM
let boxes // access the array of boxes DOM
const gameBoard = document.querySelector("#gameBoard") // access the game board DOM object
const turnMessage = document.querySelector("#turnMessage") // access the turn massage DOM object
const resetButton = document.querySelector("#reset")
const redirect = document.querySelector("#redirect")

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// functions /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let startUI = () => {
  let isBorder = false // for adding to UI, know if border class needed
  turnMessage.innerText = players[0].playerName
  players[0].playerNameDisplay.innerText = players[0].playerName
  players[1].playerNameDisplay.innerText = players[1].playerName
  if (numberOfPlayers >= 3) {
    players[2].playerDiv.style.display = "block"
    players[2].playerNameDisplay.innerText = players[2].playerName
  }
  if (numberOfPlayers === 4) {
    players[3].playerDiv.style.display = "block"
    players[3].playerNameDisplay.innerText = players[3].playerName
  }
  for (let lineCount = 0; lineCount < 2 * height + 1; lineCount++) {
    for (let itemCount = 0; itemCount < line; itemCount++) {
      twoLinesCount = Math.floor(lineCount / 2)
      boxCount = twoLinesCount * width + Math.floor(itemCount / 2)
      newDiv = document.createElement("div")
      gameBoard.appendChild(newDiv)

      if (lineCount === 0) {
        isBorder
          ? newDiv.classList.add(`i${boxCount}0`, "border", "horizontal")
          : newDiv.classList.add("dot")
      } else if (lineCount > 0 && lineCount < 2 * height) {
        if (lineCount % 2 == 0) {
          isBorder
            ? newDiv.classList.add(
                `i${boxCount - width}2`,
                `i${boxCount}0`,
                "border",
                "horizontal"
              )
            : newDiv.classList.add("dot")
        } else {
          if (isBorder) {
            if (itemCount === 0) {
              newDiv.classList.add(`i${boxCount}3`, "border", "vertical")
            } else if (itemCount > 0 && itemCount < line - 1) {
              newDiv.classList.add(
                `i${boxCount - 1}1`,
                `i${boxCount}3`,
                "border",
                "vertical"
              )
            } else {
              newDiv.classList.add(`i${boxCount - 1}1`, "border", "vertical")
            }
          } else {
            newDiv.classList.add(`i${boxCount}`, "box")
          }
        }
      } else {
        isBorder
          ? newDiv.classList.add(
              `i${boxCount - width}2`,
              "border",
              "horizontal"
            )
          : newDiv.classList.add("dot")
      }

      isBorder = !isBorder
    }
  }
  gameBoard.style.gridTemplateColumns = `repeat(${width}, 15px ${
    100 / (1.25 * width)
  }vh) 15px`
  gameBoard.style.gridTemplateRows = `repeat(${height}, 15px ${
    100 / (1.25 * width)
  }vh) 15px`
  borders = document.querySelectorAll(".border")
  boxes = document.querySelectorAll(".box")
}

let adjustWhenCompletedBox = (completedBoxIndex) => {
  boxes[completedBoxIndex].style.backgroundColor = players[turnIndex].color
  players[turnIndex].playerScore++
  players[turnIndex].playerScoreDisplay.innerText =
    players[turnIndex].playerScore
  choiceCount++
}

let checkWinBox = (index) => {
  isABoxCompleted = false
  let completedBoxIndex
  let classListCopy = [...borders[index].classList].slice(0, -3)
  classListCopy.forEach((relationToBoxIndex) => {
    box = parseInt(relationToBoxIndex.slice(1, -1))
    if (
      document.querySelector(`.i${box}0`).classList.contains("clicked") &&
      document.querySelector(`.i${box}1`).classList.contains("clicked") &&
      document.querySelector(`.i${box}2`).classList.contains("clicked") &&
      document.querySelector(`.i${box}3`).classList.contains("clicked")
    ) {
      adjustWhenCompletedBox(box)
      isABoxCompleted = true
    }
  })
  return isABoxCompleted
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Event Listeners //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
startUI()

borders.forEach((border, index) => {
  border.addEventListener("click", () => {
    if (!border.classList.contains("clicked")) {
      border.classList.add("clicked")
      if (checkWinBox(index)) {
        if (choiceCount >= width * height) {
          // complete
        }
      } else {
        turnIndex = (turnIndex + 1) % numberOfPlayers
        turnMessage.innerText = players[turnIndex].playerName
      }
    }
  })
})

resetButton.addEventListener("click", () => {
  turnIndex = 0
  turnMessage.innerText = players[0].playerName
  for (let i = 0; i < numberOfPlayers; i++) {
    players[i].playerScore = 0
    players[i].playerScoreDisplay.innerText = "0"
  }
  borders.forEach((border) => {
    if (border.classList.contains("clicked")) border.classList.toggle("clicked")
  })
  boxes.forEach((box) => {
    box.style.backgroundColor = "cadetblue"
  })
})

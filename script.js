// SARA JALAL ALI ALKHOZAAE
// 11/9/2025 - 18/9/2025
// Digitalize the famous Dots and Boxes game

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Global variables /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////// playes variables - containing scores, turn, names - ////////////////////////////
let turn = true // track the users turns
let player1 = "Sara" // name of first player
let player2 = "Ruqaya" // name of second player
let playerScore1 = 0
let playerScore2 = 0
const playerScore1Display = document.querySelector("#playerScore1")
const playerScore2Display = document.querySelector("#playerScore2")

//////////////////////////// game variables - containing dimensions and counts - ////////////////////////////
const width = 7 // number of boxes columns
const height = 4 // number of boxes rows
let choiceCount = 0 // count the number of selected borders
let addedCount = 0 // count index of border added to UI
const line = 2 * width + 1 // number of borders associate to line of boxes ignoring the bottom borders
const numberOfGridDivs = (2 * width + 1) * (2 * height + 1) // the number of all grid divs

////////////////////////////// DOM objects variables - accessing DOM objects - //////////////////////////////
let borders // access the array of borders DOM
let boxes // access the array of boxes DOM
const gameBoard = document.querySelector("#gameBoard") // access the game board DOM object
const turnMessage = document.querySelector("#turnMessage") // access the turn massage DOM object

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// functions /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
let startUI = () => {
  let isBorder = false // for adding to UI, know if border class needed
  turnMessage.innerText = player1
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

      addedCount++
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
  if (turn) {
    boxes[completedBoxIndex].style.backgroundColor = "lightcoral"
    playerScore1++
    playerScore1Display.innerText = playerScore1
  } else {
    boxes[completedBoxIndex].style.backgroundColor = "blue"
    playerScore2++
    playerScore2Display.innerText = playerScore2
  }
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

//logic
startUI()

// event listener
borders.forEach((border, index) => {
  border.addEventListener("click", () => {
    if (!border.classList.contains("clicked")) {
      border.classList.add("clicked")
      if (checkWinBox(index)) {
        if (choiceCount >= width * height) {
          // complete
        }
      } else {
        turn = !turn
        turn
          ? (turnMessage.innerText = player1)
          : (turnMessage.innerText = player2)
      }
    }
  })
})

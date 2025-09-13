// Global variables
let turn = true // track the users turns
let player1 = "Sara" // name of first player
let player2 = "Ruqaya" // name of second player
const width = 7 // number of boxes columns
const height = 4 // number of boxes rows
let choiceCount = 0 // count the number of selected borders
let addedCount = 0 // count index of border added to UI
let isBorder = false // for adding to UI, know if border class needed
const line = 2 * width + 1 // number of borders associate to line of boxes ignoring the bottom borders
const numberOfGridDivs = (2 * width + 1) * (2 * height + 1) // the number of all grid divs
let borders // access the array of borders DOM
let boxes // access the array of boxes DOM
let gameBoard = document.querySelector("#gameBoard") // access the game board DOM object
let turnMessage = document.querySelector("#turnMessage") // access the turn massage DOM object
// functions
let startUI = () => {
  turnMessage.innerText = player1
  for (let i = 0; i < numberOfGridDivs; i++) {
    newDiv = document.createElement("div")
    gameBoard.appendChild(newDiv)
    if (addedCount % (2 * line) < line && isBorder) {
      newDiv.classList.add("border", "horizontal")
    } else if (addedCount % (2 * line) >= line && isBorder) {
      newDiv.classList.add("border", "vertical")
    } else if (addedCount % (2 * line) >= line && !isBorder) {
      newDiv.classList.add("box")
    } else {
      newDiv.classList.add("dot")
    }
    addedCount++
    isBorder = !isBorder
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

let checkWinHorizontal = (index) => {
  isABoxCompleted = false
  let completedBoxIndex
  if (index > width) {
    //check up
    console.log("up")
    if (
      borders[index - width].classList.contains("clicked") &&
      borders[index - width - 1].classList.contains("clicked") &&
      borders[index - 2 * width - 1].classList.contains("clicked")
    ) {
      console.log("upSquare")
      completedBoxIndex =
        (index % line) + width * (Math.floor(index / line) - 1)
      boxes[completedBoxIndex].style.backgroundColor = "lightcoral"
      isABoxCompleted = true
    }
  }
  if (index < line * height) {
    // check down
    console.log("down")
    if (
      borders[index + width].classList.contains("clicked") &&
      borders[index + width + 1].classList.contains("clicked") &&
      borders[index + 2 * width + 1].classList.contains("clicked")
    ) {
      console.log("downSquare")
      completedBoxIndex = (index % line) + width * Math.floor(index / line)
      boxes[completedBoxIndex].style.backgroundColor = "lightcoral"
      isABoxCompleted = true
    }
  }
  return isABoxCompleted
}

let checkWinVertical = (index) => {
  isABoxCompleted = false
  if (index % line != width) {
    //check left
    console.log("left")
    if (
      borders[index - 1].classList.contains("clicked") &&
      borders[index - width - 1].classList.contains("clicked") &&
      borders[index + width].classList.contains("clicked")
    ) {
      console.log("leftSquare")
      completedBoxIndex =
        (index % line) - width - 1 + width * Math.floor(index / line)
      console.log(completedBoxIndex)
      boxes[completedBoxIndex].style.backgroundColor = "lightcoral"
      isABoxCompleted = true
    }
  }
  if (index % line != line - 1) {
    // check right
    console.log("right")
    if (
      borders[index + 1].classList.contains("clicked") &&
      borders[index + width + 1].classList.contains("clicked") &&
      borders[index - width].classList.contains("clicked")
    ) {
      console.log("rightSquare")
      completedBoxIndex =
        (index % line) - width + width * Math.floor(index / line)
      boxes[completedBoxIndex].style.backgroundColor = "lightcoral"
      isABoxCompleted = true
    }
  }
  return isABoxCompleted
}

let checkWinBox = (index) => {
  console.log(index)
  if (borders[index].classList.contains("horizontal")) {
    if (checkWinHorizontal(index)) return true
  } else if (borders[index].classList.contains("vertical")) {
    if (checkWinVertical(index)) return true
  }
  return false
}

//logic
startUI()

// event listener
borders.forEach((border, index) => {
  border.addEventListener("click", () => {
    if (!border.classList.contains("clicked")) {
      border.classList.add("clicked")
      if (checkWinBox(index)) {
        choiceCount++
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

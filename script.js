// Global variables
let turn = 0
const width = 10
const height = 6
let ChoiceCount = 0
let addedCount = 0
let isBorder = false
let gameBoard = document.querySelector("#gameBoard")
let borders = document.querySelectorAll(".border")
let boxes = document.querySelectorAll(".box")
// functions
let startUI = () => {
  const line = 2 * width + 1
  const numberOfBoxes = (2 * width + 1) * (2 * height + 1)
  for (let i = 0; i < numberOfBoxes; i++) {
    newDiv = document.createElement("div")
    gameBoard.appendChild(newDiv)
    if (addedCount % (4 * width + 2) < line && isBorder) {
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
  gameBoard.style.gridTemplateColumns = `repeat(${width}, 20px 1fr) 20px`
  gameBoard.style.gridTemplateRows = `repeat(${height}, 20px 1fr) 20px`
}
//logic
startUI()
// event listener

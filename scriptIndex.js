sizes = document.querySelectorAll(".boardSizes")
previousSelected = sizes[0]

sizes.forEach((size) => {
  size.addEventListener("click", () => {
    previousSelected.classList.toggle("selected")
    size.classList.add("selected")
    previousSelected = size
  })
})

redirect.addEventListener("click", () => {
  playerNameInput1 = document.querySelector("#playerName1").value
  playerNameInput2 = document.querySelector("#playerName2").value
  sessionStorage.setItem(
    "playerName1",
    playerNameInput1 ? playerNameInput1 : "guest1"
  )
  sessionStorage.setItem(
    "playerName2",
    playerNameInput2 ? playerNameInput2 : "guest2"
  )
  switch (document.querySelector(".selected").id) {
    case "boardSize2":
      sessionStorage.setItem("boardDimension", "56")
      break
    case "boardSize3":
      sessionStorage.setItem("boardDimension", "69")
      break
    default:
      sessionStorage.setItem("boardDimension", "47")
  }

  window.location.href = "game.html"
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Global variables /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

sizes = document.querySelectorAll(".boardSizes")
previousSizeSelected = sizes[0]
numberOfPlayersList = document.querySelectorAll(".numberOfPlayers")
previousPlayersSelected = numberOfPlayersList[0]

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// Event Listeners //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
sizes.forEach((size) => {
  size.addEventListener("click", () => {
    previousSizeSelected.classList.toggle("selected")
    size.classList.add("selected")
    previousSizeSelected = size
  })
})

numberOfPlayersList.forEach((num) => {
  num.addEventListener("click", () => {
    previousPlayersSelected.classList.toggle("selected")
    num.classList.add("selected")
    previousPlayersSelected = num

    switch (document.querySelector(".numberOfPlayers.selected").id) {
      case "numberOfPlayer2":
        document.querySelector("#player3Index").style.display = "none"
        document.querySelector("#player4Index").style.display = "none"
        break
      case "numberOfPlayer3":
        document.querySelector("#player3Index").style.display = "block"
        document.querySelector("#player4Index").style.display = "none"
        break
      case "numberOfPlayer4":
        document.querySelector("#player3Index").style.display = "block"
        document.querySelector("#player4Index").style.display = "block"
        break
    }
  })
})

redirect.addEventListener("click", () => {
  playerNameInput1 = document.querySelector("#playerName1").value
  playerNameInput2 = document.querySelector("#playerName2").value
  playerNameInput3 = document.querySelector("#playerName3").value
  playerNameInput4 = document.querySelector("#playerName4").value
  sessionStorage.setItem(
    "playerName1",
    playerNameInput1 ? playerNameInput1 : "guest1"
  )
  sessionStorage.setItem(
    "playerName2",
    playerNameInput2 ? playerNameInput2 : "guest2"
  )
  switch (document.querySelector(".boardSizes.selected").id) {
    case "boardSize2":
      sessionStorage.setItem("boardDimension", "56")
      break
    case "boardSize3":
      sessionStorage.setItem("boardDimension", "69")
      break
    default:
      sessionStorage.setItem("boardDimension", "47")
  }
  switch (document.querySelector(".numberOfPlayers.selected").id) {
    case "numberOfPlayer3":
      sessionStorage.setItem("numberOfPlayers", 3)
      sessionStorage.setItem(
        "playerName3",
        playerNameInput3 ? playerNameInput3 : "guest3"
      )
      break
    case "numberOfPlayer4":
      sessionStorage.setItem("numberOfPlayers", 4)
      sessionStorage.setItem(
        "playerName3",
        playerNameInput3 ? playerNameInput3 : "guest3"
      )
      sessionStorage.setItem(
        "playerName4",
        playerNameInput4 ? playerNameInput4 : "guest4"
      )
      break
    default:
      sessionStorage.setItem("numberOfPlayers", 2)
  }

  window.location.href = "game.html"
})

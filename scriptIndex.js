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

  window.location.href = "game.html"
})

let gameBtn = document.querySelector('#game')
gameBtn.addEventListener("click", init)


function init() {
  let playersArr = []
  let player = new Player("Anonymous", 10, 1, 0)

  nbPlayers = parseInt(prompt("Combien de joueurs ?"))
  for (i = 1; i <= nbPlayers; i++) {
    let playerName = prompt(`Joueur-${i} quel est ton nom ?`)
    whichCharacter = parseInt(prompt(`Très bien ${playerName}, quel est ton personnage ? Tapes 1 pour Fighter`))
    switch (whichCharacter) {
      case 1:
        alert(`Tu as choisi d'être un FIGHTER nommé ${playerName}`)
        player = new Fighter(playerName)
        playersArr.push(player)
        break;
      default:
        alert(`Tant pis pour toi  ${playerName}, Tu seras un Fighter`)
        player = new Fighter(playerName)
        playersArr.push(player)
    }
  }
  alert("La Partie va commencer..... Que le meilleur gagne !")
  new Game(playersArr).playGame()
}
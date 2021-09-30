let gameBtn = document.querySelector('#game')
gameBtn.addEventListener("click", init)


function init() {
  let playersArr = []
  let player = new Player("Anonymous", 10, 1, 0)

  nbPlayers = parseInt(prompt("Combien de joueurs ?"))
  for (i = 1; i <= nbPlayers; i++) {
    let playerName = prompt(`Joueur-${i} quel est ton nom ?`)
    whichCharacter = parseInt(prompt(`Très bien ${playerName}, quel est ton personnage ? Tapes 1 pour Fighter, 2 pour Paladin, 3 pour Monk, 4 pour Berzeker, 5 pour Assassin`))
    switch (whichCharacter) {
      case 1:
        alert(`Tu as choisi d'être un FIGHTER nommé ${playerName}`)
        player = new Fighter(playerName)
        playersArr.push(player)
        break;
      case 2:
        alert(`Tu as choisi d'être un PALADIN nommé ${playerName}`)
        player = new Paladin(playerName)
        playersArr.push(player)
        break;
      case 3:
        alert(`Tu as choisi d'être un MOINE nommé ${playerName}`)
        player = new Monk(playerName)
        playersArr.push(player)
        break;
      case 4:
        alert(`Tu as choisi d'être un BERZEKER nommé ${playerName}`)
        player = new Berzeker(playerName)
        playersArr.push(player)
        break;
      case 5:
        alert(`Tu as choisi d'être un ASSASSIN nommé ${playerName}`)
        player = new Assassin(playerName)
        playersArr.push(player)
        break;
      default:
        alert(`Tant pis pour toi ${playerName}, Tu seras un Fighter`)
        player = new Fighter(playerName)
        playersArr.push(player)
    }
  }
  alert("La Partie va commencer..... Que le meilleur gagne !")
  new Game(playersArr).playGame()
}
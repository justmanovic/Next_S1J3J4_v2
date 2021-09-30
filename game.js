class Game {
  constructor(playersArr) {
    this.playersArr = playersArr
    this.turnNb = 1
    this.gameStatus = 'Playing'
  }

  updatePlayersArr() {
    this.playersArr.forEach(player => player.previousTurnSpecial = player.thisTurnSpecial)
    this.playersArr = this.playersArr.filter(player => player.hp > 0)
    return this.playersArr
  }

  checkGameOver() {
    this.updatePlayersArr()
    if (this.turnNb === 10) {
      console.log(`Les jeux sont faits, rien ne va plus !`)
      this.gameStatus = 'End of game'
      return this.gameStatus
    } else if (this.playersArr.length < 2) {
      console.log(`Il n'y a plus qu'un joueur en jeu : ${this.playersArr[0].name}... il gagne !`)
      this.gameStatus = 'End of game'
      return this.gameStatus
    }
    else {
      console.log("RAS, pas de game over pour l'instant, le jeu continue")
    }
  }

  playGame() {
    while (this.gameStatus === 'Playing') {
      if (this.turnNb > 1)
        this.checkGameOver()
      let turn = new Turn(this.playersArr)
      if (this.playersArr.length > 1) {
        turn.startTurn(this.turnNb)
        this.turnNb++
      }
    }
  }
}

class Turn {
  constructor(playersArr) {
    this.playersArr = playersArr
  }

  startTurn(turn) {
    console.log('**************************************')
    console.log(`C'est le début du tour n° ${turn}`)
    this.showPlayer()
    this.fightBetweenPlayers()
    console.log(`C'est la fin du tour n° ${turn}`)
    console.log('**************************************')
  }

  fightBetweenPlayers() {
    this.playersArr.forEach(player => {
      if (this.playersArr.length > 1 && player.hp > 0)
        player.attack(this.chooseVictim(player))
    })
  }

  chooseVictim(currentPlayer) {
    let victim = 0
    victim = this.playersArr[parseInt(prompt(`${currentPlayer.name}, quel joueur veux-tu niquer?`))]
    while (!this.playersArr.includes(victim)) {
      alert(`Allez, un petit effort ! Choisis un nombre entre 0 et ${this.playersArr.length - 1}`)
      victim = this.playersArr[parseInt(prompt(`${currentPlayer.name}, quel joueur veux-tu niquer?`))]
    }
    return victim
  }

  showPlayer() {
    console.log("Voici l'état des joueurs en ce début de manche...")
    this.playersArr.forEach(player => console.log(`${this.playersArr.indexOf(player)} - ${player.name} - ${player.hp} hp  - ${player.mana} mana`))
  }
}

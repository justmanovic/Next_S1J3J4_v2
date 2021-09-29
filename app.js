class Player {
  constructor(name, hp, dmg, mana) {
    this.name = name
    this.hp = hp
    this.dmg = dmg
    this.mana = mana
    this.status = 'playing'
  }

  takeDamage(dmg) {
    this.hp -= dmg
  }

  attack(victim) {
    console.log(`${this.name} passe à l'attaque et inflige ${this.dmg} dmg à ${victim.name} `)
    victim.takeDamage(this.dmg)
    this.checkVictimStatus(victim)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~')
  }

  checkVictimStatus(victim) {
    if (victim.hp <= 0) {
      this.mana += 20
      console.log(`The victim has been killed`)
      console.log(`${this.name} gagne 20 points mana`)
    }
    else {
      console.log(`la vikos ${victim.name} n'est pas morte, elle perd ${this.dmg} hp, il lui reste ${victim.hp} hp ! !`)
    }
  }
}

class Fighter extends Player {
  constructor(name, hp = 12, dmg = 4, mana = 40) {
    super(name, hp, dmg, mana, status)
    this.specialAttackName = 'Dark Vision'
    this.dmgSpecial = 5
    this.manaCost = 20
    // this.healPower = healPower
  }
}

class Turn {
  constructor(playersArr) {
    this.playersArr = playersArr
  }

  startTurn(turn) {
    console.log('**************************************')
    console.log(`C'est le début du tour n° ${turn}`)
    this.showPlayer()
    // this.showPlayer()
    jo.attack(aki)
    // this.checkGameOver()
    if (aki.hp > 0)
      aki.attack(jo)
    console.log(`C'est la fin du tour n° ${turn}`)
    console.log('**************************************')
  }

  showPlayer() {
    console.log("Voici l'état des joueurs en ce début de manche...")
    this.playersArr.forEach(player => console.log(player))
  }
}

class Game {
  constructor(playersArr, gameStatus) {
    this.playersArr = playersArr
    this.turnNb = 1
    this.gameStatus = 'Playing'
  }

  updatePlayersArr() {
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
      this.checkGameOver()
      let turn = new Turn(this.playersArr)
      if (this.playersArr.length > 1) {
        turn.startTurn(this.turnNb)
        this.turnNb++
      }
    }
  }





}



const jo = new Fighter('Justman')
const aki = new Fighter('Chang')

const game = new Game([jo, aki])
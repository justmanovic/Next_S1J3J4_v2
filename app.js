let gameBtn = document.querySelector('#game')

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

  loseMana(mana) {
    this.mana -= mana
  }

  regularAttack(victim) {
    console.log(`${this.name} passe à l'attaque et inflige ${this.dmg} dmg à ${victim.name}`)
    victim.takeDamage(this.dmg)
    this.checkVictimStatus(victim, this.dmg)
  }

  attackSpecial(victim) {
    if (this.mana > this.manaCost) {
      console.log(`Waaaouwww!!! ${this.name} lance son attaque SPECIALE ${this.specialAttackName} et inflige ${this.dmgSpecial} dmg à ${victim.name} `)
      victim.takeDamage(this.dmgSpecial)
      this.checkVictimStatus(victim, this.dmgSpecial)
      this.loseMana(this.manaCost)
    } else {
      alert("Vous n'avez pas aseez de mana ! Lancement de l'attaque classique...")
      victim.takeDamage(this.dmg)
      this.checkVictimStatus(victim, this.dmg)
    }
  }

  askWhichAttack() {
    return parseInt(prompt(`Quelle attaque lancer ? 1 pour la classique, 2 pour la spéciale ${this.specialAttackName}`))
  }

  attack(victim) {
    let chooseAttack = 0
    chooseAttack = this.askWhichAttack()
    if (chooseAttack === 1)
      this.regularAttack(victim)
    else if (chooseAttack === 2)
      this.attackSpecial(victim)
    else {
      alert('Allez, essaie encore... ')
      chooseAttack = this.askWhichAttack()

    }
    console.log('~~~ Attaque terminée ~~~')
  }

  checkVictimStatus(victim, dmg) {
    if (victim.hp <= 0) {
      this.mana += 20
      console.log(`${victim.name} est DEAAAD`)
      console.log(`${this.name} gagne 20 points mana`)
    }
    else {
      console.log(`la vikos ${victim.name} n'est pas morte, elle perd ${dmg} hp, il lui reste ${victim.hp} hp ! !`)
    }
  }
}

class Fighter extends Player {
  constructor(name, hp = 12, dmg = 4, mana = 40) {
    super(name, hp, dmg, mana, status)
    this.specialAttackName = 'Dark Vision'
    this.dmgSpecial = 5
    this.manaCost = 20
    this.specialAttackArr = []
    // this.healPower = healPower
  }
}

class Game {
  constructor(playersArr) {
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
    return this.playersArr[parseInt(prompt(`${currentPlayer.name}, quel joueur veux-tu niquer?`))]
  }

  showPlayer() {
    console.log("Voici l'état des joueurs en ce début de manche...")
    this.playersArr.forEach(player => console.log(`${this.playersArr.indexOf(player)} - ${player.name} - ${player.hp} hp  - ${player.mana} mana`))
  }
}

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

gameBtn.addEventListener("click", init)

const jo = new Fighter('Justman')
const aki = new Fighter('Chang')
const eric = new Fighter('Rico')

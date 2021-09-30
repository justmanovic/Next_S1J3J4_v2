class Player {
  constructor(name, hp, dmg, mana) {
    this.name = name
    this.hp = hp
    this.dmg = dmg
    this.mana = mana
    this.previousTurnSpecial = false
    this.thisTurnSpecial = false
  }

  takeDamage(dmg) {
    this.hp -= dmg
  }

  regularAttack(victim) {
    console.log(`${this.name} passe à l'attaque et inflige ${this.dmg} dmg à ${victim.name}`)
    victim.takeDamage(this.dmg)
    this.checkVictimStatus(victim, this.dmg)
  }

  attackSpecial(victim) {
    if (this.mana >= this.manaCost) {
      console.log(`Waaaouwww!!! ${this.name} lance son attaque SPECIALE ${this.specialAttackName} et inflige ${this.dmgSpecial} dmg à ${victim.name} `)
      victim.takeDamage(this.dmgSpecial)
      this.checkVictimStatus(victim, this.dmgSpecial)
      this.loseMana(this.manaCost)
      if (this.healPower !== 0)
        this.heal(this.healPower)
      if (this.specialImproveAttack > 0)
        this.improvedAttack()

    } else {
      alert("Vous n'avez pas aseez de mana ! Lancement de l'attaque classique...")
      this.regularAttack(victim)
    }
  }

  askWhichAttack() {
    return parseInt(prompt(`Quelle attaque lancer ? 1 pour la classique, 2 pour la spéciale ${this.specialAttackName}`))
  }

  attack(victim) {
    this.previousTurnSpecial = this.thisTurnSpecial
    let chooseAttack = 0
    chooseAttack = this.askWhichAttack()
    switch (chooseAttack) {
      case 1:
        this.thisTurnSpecial = false
        this.regularAttack(victim)
        break;
      case 2:
        this.thisTurnSpecial = true
        this.attackSpecial(victim)
        break;
      default:
        alert('Allez, essaie encore... ');
        chooseAttack = this.askWhichAttack();
    }
    console.log('~~~ Attaque terminée ~~~')
  }

  checkVictimStatus(victim, dmg) {
    if (victim.hp <= 0) {
      loseMana(-20)
      console.log(`${victim.name} est DEAAAD`)
      console.log(`${this.name} gagne 20 points mana`)
    }
    else {
      console.log(`la vikos ${victim.name} n'est pas morte, elle perd ${dmg} hp, il lui reste ${victim.hp} hp !!`)
    }
  }

  loseMana(mana) {
    this.mana -= mana
  }

  heal(healPts) {
    this.hp += healPts
    healPts > 0 ? console.log(`${this.name} gagne ${healPts} hp grâce à son attaque spéciale !`) : console.log(`${this.name} perd ${healPts} hp à cause de son attaque spéciale!`)
  }

  improvedAttack() {
    this.dmg += 1
    console.log(`Incroyable ! L'attaque de ${this.name} gagne 1 points de dmg ! Elle est maintenant de ${this.dmg} dmg !`)
  }
}

class Fighter extends Player {
  constructor(name, hp, dmg, mana) {
    super(name)
    this.specialAttackName = 'Dark Vision'
    this.dmg = 4
    this.hp = 12
    this.mana = 40
    this.dmgSpecial = 5
    this.manaCost = 20
    this.healPower = 0
  }

  takeDamage = (dmg) => {
    if (this.thisTurnSpecial === true) {
      this.hp -= dmg - 2
      console.log(`Le joueur ${this.name} a utilisé son attaque spéciale durant ce tour... Il perd 2 hp de moins ${dmg - 2}hp au lieu de ${dmg}hp en temps normal`)
    }
    else {
      this.hp -= dmg
    }
  }

}

class Paladin extends Player {
  constructor(name, hp, dmg, mana) {
    super(name)
    this.specialAttackName = 'Healing Lighting'
    this.dmg = 3
    this.hp = 16
    this.mana = 160
    this.dmgSpecial = 4
    this.manaCost = 20
    this.healPower = 5
  }
}

class Monk extends Player {
  constructor(name, hp, dmg, mana) {
    super(name)
    this.specialAttackName = 'Heal'
    this.dmg = 2
    this.hp = 8
    this.mana = 200
    this.dmgSpecial = 0
    this.manaCost = 25
    this.healPower = 8
  }
}

class Berzeker extends Player {
  constructor(name, hp, dmg, mana) {
    super(name)
    this.specialAttackName = 'Rage'
    this.dmg = 4
    this.hp = 8
    this.mana = 0
    this.dmgSpecial = 0
    this.manaCost = 0
    this.healPower = -1
    this.specialImproveAttack = 1
  }
}

class Assassin extends Player {
  constructor(name, hp, dmg, mana) {
    super(name)
    this.specialAttackName = 'Shadow Hit'
    this.dmg = 6
    this.hp = 6
    this.mana = 20
    this.dmgSpecial = 7
    this.manaCost = 20
    this.healPower = 0
  }

  takeDamage(dmg) {
    if (this.previousTurnSpecial === true) {
      console.log(`${this.name} est protégé car il a utilisé son attaque spéciale au dernier tour ! Il ne perd donc pas de hp`)
    }
    else {
      this.hp -= dmg
    }
  }

}




const jo = new Fighter('Justman')
const aki = new Fighter('Chang')
const eric = new Fighter('Rico')
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
      regularAttack(victim)
    }
  }

  askWhichAttack() {
    return parseInt(prompt(`Quelle attaque lancer ? 1 pour la classique, 2 pour la spéciale ${this.specialAttackName}`))
  }

  attack(victim) {
    let chooseAttack = 0
    chooseAttack = this.askWhichAttack()
    switch (chooseAttack) {
      case 1:
        this.regularAttack(victim)
        break;
      case 2:
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
      this.mana += 20
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



const jo = new Fighter('Justman')
const aki = new Fighter('Chang')
const eric = new Fighter('Rico')
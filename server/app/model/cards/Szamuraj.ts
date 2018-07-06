import { Card } from '../cards/Card';
import { Player } from '../Player';

export class Szamuraj extends Card {

  constructor(id: number) {
    super(id,  2, 9, 3);
    this.soundFolderLocation = 'assets/sounds/samuraj/';
    this.backgroundImageName = '/cards/szamuraj.png';
    this.onAttackSound = 'attack.ogx';
    this.onDeathSound = 'death.ogx';
    this.onPlaySound = 'play.ogx';
  }

  attackCard(activePlayer: Player, defenderPlayer: Player, enemyCard: Card) {
    enemyCard.onAttacked(activePlayer, defenderPlayer, this);
    this.health -= enemyCard.attack;
    this.onCoolDown = true;
    if (enemyCard.health > 0) {
      this.health = 0;
    }
  }
}

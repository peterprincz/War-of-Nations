import { Card } from "../cards/Card";
import { Player } from "../Player";

export class Lovasijasz extends Card {

  constructor(id: number) {
    super(id, 4, 5, 4);
    this.onCoolDown = true;
    this.hasTaunt = false;
    this.soundFolderLocation = "assets/sounds/lovasijasz/";
    this.backgroundImageName = "/cards/lovasijasz.png"
    this.onAttackSound = "attack.wav";
    this.onDeathSound = "death.wav";
    this.onPlaySound = "play.wav";
  }

  attackCard(activePlayer: Player, defenderPlayer: Player, enemyCard: Card) {
    enemyCard.onAttacked(activePlayer, defenderPlayer, this);
    this.health -= enemyCard.attack;
    this.onCoolDown = true;
    if (enemyCard.health <= 0)
    {
      activePlayer.mana += 2;
    }
  }
}

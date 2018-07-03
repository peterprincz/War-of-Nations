import { Card } from './Card';
import { Player } from "../Player";

export class Pap extends Card {

  healPower: number;
  onHealSound: string;

  constructor(id: number) {
    super(id, 3, 1, 1);
    this.onCoolDown = true;
    this.hasTaunt = false;
    this.soundFolderLocation = 'assets/sounds/pap/';
    this.backgroundImageName = '/cards/pap.png';
    this.healPower = 2;
    this.onDeathSound = 'death.mp3';
    this.onPlaySound = 'play.mp3';
    this.onHealSound = 'heal.mp3';
  }

  attackPlayer(activePlayer: Player, passivePlayer: Player) {
    return;
  }

  onHealed(activePlayer: Player, passivePlayer: Player, amount: number) {
    return;
  }

  attackCard(activePlayer: Player, defenderPlayer: Player, enemyCard: Card) {
    return;
  }

  onTurnEnd(activePlayer: Player, passivePlayer: Player) {
    activePlayer.half.cards.forEach(card => {
      card.onHealed(activePlayer, passivePlayer, this.healPower);
    });
  }
}

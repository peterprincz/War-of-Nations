import { Card } from "../cards/Card";
import { Player } from "../Player";

export class Kereszteslovag extends Card {

  constructor(id: number) {
    super(id, 5, 7, 7);
    this.onCoolDown = true;
    this.hasTaunt = false;
    this.soundFolderLocation = "assets/sounds/kereszteslovag/";
    this.backgroundImageName = "/cards/kereszteslovag.png"
  }

  attackCard(activePlayer: Player, defenderPlayer: Player, enemyCard: Card) {
    enemyCard.onAttacked(activePlayer, defenderPlayer, this);
    this.health -= enemyCard.attack;
    this.onCoolDown = true;
  }

  attackPlayer(activePlayer: Player, passivePlayer: Player) {
    passivePlayer.onAttacked(this);
    this.onCoolDown = true;
  }

  onTurnStart(activePlayer: Player, passivePlayer: Player){
    this.onCoolDown = false;
  }

  onPlayFromHand(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onDeath(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onTurnEnd(activePlayer: Player, passivePlayer: Player){
    this.health += 1;
    this.attack += 1;
  }

  onEnemyTurnEnd(activePlayer: Player, passivePlayer: Player){
    this.health += 1;
    this.attack += 1;
  }
}

import { Card } from "../cards/Card";
import { Player } from "../Player";

export class Egrivar extends Card {

  constructor(id: number) {
    super(id, 5, 8, 1);
    this.onCoolDown = true;
    this.hasTaunt = true;
    this.soundFolderLocation = "assets/sounds/egrivar/";
    this.backgroundImageName = "/cards/egrivar.png"
  }

  attackCard(activePlayer: Player, defenderPlayer: Player, enemyCard: Card){
    return;
  }

  attackPlayer(activePlayer: Player, passivePlayer: Player) {
    return;
  }

  onTurnStart(activePlayer: Player, passivePlayer: Player){
    return;
  }

}

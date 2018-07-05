import { Card } from "../cards/Card";
import { Player } from "../Player";

export class LengyelHuszar extends Card {

  constructor(id: number) {
    super(id, 3, 3, 3);
    this.onCoolDown = true;
    this.hasTaunt = false;
    this.soundFolderLocation = "assets/sounds/lengyelhuszar/";
    this.backgroundImageName = "/cards/lengyelhuszar.png"
    this.onAttackSound = "attack.wav";
    this.onDeathSound = "death.wav";
    this.onPlaySound = "play.wav";
  }


  onPlayFromHand(activePlayer: Player, passivePlayer: Player){
    this.onCoolDown = false;
  }
}
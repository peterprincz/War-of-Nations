import { Card } from '../cards/Card';
import { Player } from '../Player';

export class Olaszzsoldos extends Card {

  constructor(id: number) {
    super(id, 2, 3, 6);
    this.onCoolDown = true;
    this.hasTaunt = false;
    this.soundFolderLocation = 'assets/sounds/olaszzsoldos/';
    this.backgroundImageName = '/cards/olaszzsoldos.png'
    this.onAttackSound = 'attack.mp3';
    this.onDeathSound = 'death.mp3';
    this.onPlaySound = 'play.mp3';
  }
}

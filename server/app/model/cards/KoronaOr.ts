import { Card } from '../cards/Card';
import { Player } from '../Player';

export class KoronaOr extends Card {

  constructor(id: number) {
    super(id, 2, 2, 2);
    this.onCoolDown = true;
    this.hasTaunt = false;
    this.soundFolderLocation = 'assets/sounds/koronaor/';
    this.backgroundImageName = '/cards/koronaor.png';
    this.onAttackSound = 'attack.mp3';
    this.onDeathSound = 'death.mp3';
    this.onPlaySound = 'play.mp3';
  }
}

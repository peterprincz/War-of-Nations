import { Card } from '../cards/Card';
import { Player } from '../Player';

export class Magyarhonved extends Card {

  constructor(id: number) {
    super(id, 1, 1, 2);
    this.onCoolDown = true;
    this.hasTaunt = false;
    this.soundFolderLocation = 'assets/sounds/honved/';
    this.backgroundImageName = '/cards/magyarhonved.png';
    this.onAttackSound = 'attack.mp3';
    this.onDeathSound = 'death.mp3';
    this.onPlaySound = 'play.mp3';
  }
}

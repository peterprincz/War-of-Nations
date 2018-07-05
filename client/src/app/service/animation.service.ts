import { Injectable } from '@angular/core';
import { GameState } from '../model/GameState';
import { Card } from '../model/Card';
import { Player } from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  playAnimations(gameState: GameState, animations: Animation[]) {
    animations.forEach(animation => {
      setTimeout(() => {
        if (animation.type === 'card') {
          const card: Card = gameState.getRealCardFromJson(animation.target);
          if (animation.animation === 'playFormHand') {
            card.animations.hasJustPlayed = true;
          }
          if (animation.animation === 'pullFromDeck') {
            card.animations.hasJustPulled = true;
          }
          if (animation.animation === 'attackCard') {
            card.animations.hasJustAttackedCard = true;
          }
          if (animation.animation === 'attackPlayer') {
            card.animations.hasJustAttackedPlayer = true;
          }
          if (animation.animation === 'cardDamaged') {
            card.animations.hasJustGotDamaged = true;
          }
        } else {
          const player: Player = gameState.getRealPlayerFromJson(animation.target);
          if (animation.animation === 'playerDamaged') {
            player.animations.gotDamaged = true;
          }
        }
      }, 100 );
    });
  }


}

export class Animation {

  target: any;
  type: string;
  animation: string;

}

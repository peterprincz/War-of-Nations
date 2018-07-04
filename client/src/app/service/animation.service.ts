import { Injectable } from '@angular/core';
import { GameState } from '../model/GameState';
import { Card } from '../model/Card';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  playAnimations(gameState: GameState, animations: Animation[]) {
    animations.forEach(animation => {
      setTimeout(() => {
        // tslint:disable-next-line:prefer-const
        let card: Card = gameState.getRealCardFromJson(animation.card);
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
      }, 100 );
    });
  }


}

export class Animation {

  card: Card;
  animation: string;

  constructor(card: Card, animation: string) {
      this.card = card;
      this.animation = animation;
  }


}

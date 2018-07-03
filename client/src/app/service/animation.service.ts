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
      console.log(animation);
      setTimeout(() => {
        let card: Card = gameState.playerOne.half.cards.filter(x => animation.card.id == x.id)[0];
        if (card) {
          card.hasJustPlayed = true;
        } else {
          card = gameState.playerTwo.half.cards.filter(x => animation.card.id == x.id)[0];
          card.hasJustPlayed = true;
        }
      }, 10);
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

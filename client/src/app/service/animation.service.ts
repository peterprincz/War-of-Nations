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
        let card: Card = this.findCard(gameState, animation.card);
        if (animation.animation == 'playFormHand') {
          card.hasJustPlayed = true;
        }
        if (animation.animation == 'pullFromDeck') {
          card.hasJustPulled = true;
        }
        if (animation.animation == 'attackCard') {
          card.hasJustAttackedCard = true;
        }
        if (animation.animation == 'attackPlayer') {
          card.hasJustAttackedPlayer = true;
        }
      }, 100 );
    });
  }

  findCard(gameState:  GameState, card: Card): Card {
    let realCard: Card = gameState.playerOne.half.cards.filter(x => card.id == x.id)[0];
    if (realCard) { return realCard; }
    realCard = gameState.playerOne.hand.cards.filter(x => card.id == x.id)[0];
    if (realCard) { return realCard; }
    realCard = gameState.playerTwo.half.cards.filter(x => card.id == x.id)[0];
    if (realCard) { return realCard; }
    realCard = gameState.playerTwo.hand.cards.filter(x => card.id == x.id)[0];
    return realCard;
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

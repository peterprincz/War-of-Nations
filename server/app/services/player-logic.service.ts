import { Player } from '../model/Player';
import { Card } from '../model/cards/Card';
import { AnimationService } from './animation-service';


/**
 * 
 * Responsible for the Logic of the player Character
 * Pull Cards from deck to Hand, Increases mana in the begining of the each round's start etc
 * If in the future there will be multiple types of Player, then this functionalities needs to be shifted to the Player model
 *    
 */

export class PlayerLogicService {

  animationService :AnimationService;

  constructor(animationService: AnimationService) { 

    this.animationService = animationService;

  }


  isCardPlayableFromHand(activePlayer:Player, passivePlayer:Player, cardToPlay:Card): boolean{
    return cardToPlay.mana <= activePlayer.mana;
  }

  onTurnEnd(activePlayer:Player, passivePlayer:Player): void{
    return;
  }

  onTurnStart(activePlayer:Player, passivePlayer:Player): void{
    this.increaseMaximumMana(activePlayer, 1);
    this.increaseMana(activePlayer, 1);
    this.pullCardFromDeck(activePlayer, 1);
  }

  playFromHand(activePlayer:Player, passivePlayer:Player, card:Card):void{
    activePlayer.mana -= card.mana;
    activePlayer.half.cards.push(card);
    activePlayer.hand.cards = activePlayer.hand.cards.filter(x => x.id != card.id);
  }

  pullCardFromDeck(player:Player, amount: number):void{
    for(let i = 0; i < amount;i++){
      if(player.deck.length <= 0){
        player.health -= 2;
        return;
      }
      if(player.hand.cards.length <= 8){
        player.hand.cards.push(player.deck[0]);
        this.animationService.addToAnimationList(player.deck[0], "pullFromDeck")
      }
      player.deck.splice(0, 1);
    }
  }

  increaseMana(player:Player, amount: number){
    if(player.mana + amount < 11){
       player.mana += amount;
    } else {
      player.mana = 10;
    }
  }

  increaseMaximumMana(player:Player, amount: number){
    if(player.maximumMana + amount < 11){
      player.maximumMana += amount;
    } else {
      player.maximumMana = 10;
    }
  }




}

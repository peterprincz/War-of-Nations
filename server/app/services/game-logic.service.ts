import { SoundService } from './sound.service';
import { Card } from '../model/cards/Card';
import { Player } from '../model/Player';
import { CardLogicService } from './card-logic.service';
import { PlayerLogicService } from './player-logic.service';
import { AnimationService } from './animation-service';

export class GameLogicService {


  /**
   * Responsible for the communicitation between the GameService and the more complex LogicServices
   * Maintans the flow of the game, like starting-ending rounds and event handeling
   * All the complex LogicServices like Card-and PlayerLogic are connected to here, this is the center of the gameflow
   */

  cardLogicService: CardLogicService 
  playerLogicService: PlayerLogicService

  constructor(soundService:SoundService, animationService:AnimationService) {
    this.cardLogicService = new CardLogicService(soundService, animationService);
    this.playerLogicService = new PlayerLogicService(animationService);
   }

   pullStartingCards(playerOne: Player, playerTwo: Player, amount:number): void{
    this.pullCardFromDeck(playerOne, amount);
    this.pullCardFromDeck(playerTwo, amount);
  }

  endRound(activePlayer: Player, passivePlayer: Player): void{
    activePlayer.half.cards.forEach(card => {
      this.cardLogicService.onTurnEnd(activePlayer, passivePlayer, card);
    });
    passivePlayer.half.cards.forEach(card => {
      this.cardLogicService.onEnemyTurnEnd(activePlayer, passivePlayer, card);
    });
    this.playerLogicService.onTurnEnd(activePlayer, passivePlayer);
  }

  startRound(activePlayer: Player, passivePlayer: Player): void {
    activePlayer.half.cards.forEach(card => {
      this.cardLogicService.onTurnStart(activePlayer, passivePlayer, card);
    });
    this.playerLogicService.onTurnStart(activePlayer, passivePlayer);
  }

  isCardPlayableFromHand(activePlayer:Player, passivePlayer:Player, card:Card): boolean{
    return this.playerLogicService.isCardPlayableFromHand(activePlayer, passivePlayer, card)
  }

  playFromHand(activePlayer:Player, passivePlayer:Player, card:Card) {
    this.playerLogicService.playFromHand(activePlayer, passivePlayer, card);
    this.cardLogicService.onPlayFromHand(activePlayer, passivePlayer, card);
  }

  isCardAbleToAttackEnemyCard(attackerCard:Card, defenderCard: Card, defenderPlayer: Player){
    console.log(attackerCard);
    console.log(defenderCard);
    return this.cardLogicService.isCardAbleToAttackEnemyCard(attackerCard, defenderCard) &&
           (defenderCard.hasTaunt || defenderPlayer.half.cards.filter(x => x.hasTaunt).length < 1)
  }

  isCardAbleToAttackEnemyPlayer(attackerCard:Card, defenderPlayer:Player){
    return this.cardLogicService.isCardAbleToAttackEnemyPlayer(attackerCard, defenderPlayer) &&
           (defenderPlayer.half.cards.filter(x => x.hasTaunt).length < 1)
  }

  attackCard(attackerPlayer: Player, defenderPlayer: Player, attackerCard: Card, defenderCard: Card,){
    this.cardLogicService.attackCard(attackerPlayer, defenderPlayer, attackerCard, defenderCard);
  }

  attackPlayer(attackerPlayer:Player, defenderPlayer:Player, card: Card){
    this.cardLogicService.attackPlayer(attackerPlayer, defenderPlayer, card);
  }

  pullCardFromDeck(player:Player, amount:number){
    if(player.deck.length > 0 && player.hand.cards.length <= player.hand.maximumCard){
      this.playerLogicService.pullCardFromDeck(player, amount);
    }
  }

  createDeck(): Card[]{
    return this.cardLogicService.createDeck();
  }

}


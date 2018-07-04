import { SoundService } from './sound.service';
import { GameState } from './../model/GameState';
import { Card } from "../model/cards/Card";
import { Player } from "../model/Player";
import { GameLogicService } from "./game-logic.service";
import { NOTFOUND } from 'dns';
import { AnimationService } from './animation-service';

/**
 * 
 * Responsible for the communicitation between the game and the server.
 * Gets instructions from the server, parses it, then handles it next to the GameLogicService
 *    
 */


export class GameService {
  gameState: GameState;
  gameLogicService: GameLogicService;

  constructor(soundService: SoundService, animationSerivce:AnimationService) {
    this.gameLogicService = new GameLogicService(soundService, animationSerivce);
    this.gameState = this.createNewGame();
  }

  public createNewGame():GameState{
    let playerOneDeck: Card[] = this.gameLogicService.createDeck();
    let playerTwoDeck: Card[] = this.gameLogicService.createDeck();
    let playerOne: Player = new Player("béla", playerOneDeck);
    let playerTwo: Player = new Player("Jenő", playerTwoDeck);
    playerOne.isActive = true;
    this.gameLogicService.pullStartingCards(playerOne, playerTwo, 4);
    let gameState:GameState = new GameState(playerOne, playerTwo);
    return gameState;
  }

  endRound() {
    this.gameLogicService.endRound(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer());
    this.swapPlayers();
    this.startRound();
  }

  startRound() {
    this.gameLogicService.startRound(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer());
  }

  isCardPlayAbleFromHand(cardToPlay: Card):boolean {
    let realCard: Card = this.getRealCardFromJson(cardToPlay)
    return this.gameLogicService.isCardPlayableFromHand(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
  }

  isCardAbleToAttackEnemyCard(attackerCard:Card, defenderCard:Card):boolean{
    let realAttackerCard: Card = this.getRealCardFromJson(attackerCard)
    return this.gameLogicService.isCardAbleToAttackEnemyCard(realAttackerCard, defenderCard)
  }

  isCardAbleToAttackEnemyPlayer(attackerCard:Card):boolean {
    let realAttackerCard: Card = this.getRealCardFromJson(attackerCard)
    return this.gameLogicService.isCardAbleToAttackEnemyPlayer(realAttackerCard, this.gameState.getPassivePlayer())
  }

  PlayFromHand(card:Card):void {
    let realCard = this.getRealCardFromJson(card);
    this.gameLogicService.playFromHand(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
  }

  attackCard(attackerCard: Card, defenderCard: Card) {
    let realAttackerCard: Card = this.getRealCardFromJson(attackerCard)
    let realDefenderCard: Card = this.getRealCardFromJson(defenderCard);
    this.gameLogicService.attackCard(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realAttackerCard, realDefenderCard);
  }

  attackEnemyPlayer(card: Card) {
    let realCard = this.getRealCardFromJson(card);
    this.gameLogicService.attackPlayer(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
  }

  getRealCardFromJson(card: Card): Card {
    if(this.gameState.playerOne.deck.filter(realCard => realCard.id == card.id).length == 1) {
      return this.gameState.playerOne.deck.filter(realCard => realCard.id == card.id)[0];
    }
    if(this.gameState.playerOne.half.cards.filter(realCard => realCard.id == card.id).length == 1) {
      return this.gameState.playerOne.half.cards.filter(realCard => realCard.id == card.id)[0];
    }
    if(this.gameState.playerOne.hand.cards.filter(realCard => realCard.id == card.id).length == 1) {
      return this.gameState.playerOne.hand.cards.filter(realCard => realCard.id == card.id)[0];
    }
    if(this.gameState.playerTwo.deck.filter(realCard => realCard.id == card.id).length == 1) {
      return this.gameState.playerTwo.deck.filter(realCard => realCard.id == card.id)[0];
    }
    if(this.gameState.playerTwo.half.cards.filter(realCard => realCard.id == card.id).length == 1) {
      return this.gameState.playerTwo.half.cards.filter(realCard => realCard.id == card.id)[0];
    }
    if(this.gameState.playerTwo.hand.cards.filter(realCard => realCard.id == card.id).length == 1) {
      return this.gameState.playerTwo.hand.cards.filter(realCard => realCard.id == card.id)[0];
    }
    throw NOTFOUND;
  }

  swapPlayers() {
    this.gameState.switchActivePlayer();  
  }

}

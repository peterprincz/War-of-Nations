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
  animationService: AnimationService;

  constructor(soundService: SoundService, animationSerivce:AnimationService) {
    this.animationService = animationSerivce;
    this.gameLogicService = new GameLogicService(soundService, animationSerivce);
    this.gameState = GameState.createEmptyGameState();
  }

  public createNewGame():void{
    let playerOneDeck: Card[] = this.gameLogicService.createDeck();
    let playerTwoDeck: Card[] = this.gameLogicService.createDeck();
    let playerOne: Player = new Player("béla", playerOneDeck);
    let playerTwo: Player = new Player("Jenő", playerTwoDeck);
    playerOne.isActive = true;
    this.gameLogicService.pullStartingCards(playerOne, playerTwo, 4);
    let gameState:GameState = new GameState(playerOne, playerTwo);
    this.gameState = gameState;
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
    let realCard: Card = this.gameState.getRealCardFromJson(cardToPlay)
    return this.gameLogicService.isCardPlayableFromHand(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
  }

  isCardAbleToAttackEnemyCard(attackerCard:Card, defenderCard:Card):boolean{
    let realAttackerCard: Card = this.gameState.getRealCardFromJson(attackerCard)
    let realDefenderCard: Card = this.gameState.getRealCardFromJson(defenderCard)
    return this.gameLogicService.isCardAbleToAttackEnemyCard(realAttackerCard, realDefenderCard, this.gameState.getPassivePlayer())
  }

  isCardAbleToAttackEnemyPlayer(attackerCard:Card):boolean {
    let realAttackerCard: Card = this.gameState.getRealCardFromJson(attackerCard)
    return this.gameLogicService.isCardAbleToAttackEnemyPlayer(realAttackerCard, this.gameState.getPassivePlayer())
  }

  PlayFromHand(card:Card):void {
    let realCard = this.gameState.getRealCardFromJson(card);
    this.gameLogicService.playFromHand(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
  }

  attackCard(attackerCard: Card, defenderCard: Card) {
    let realAttackerCard: Card = this.gameState.getRealCardFromJson(attackerCard)
    let realDefenderCard: Card = this.gameState.getRealCardFromJson(defenderCard);
    this.gameLogicService.attackCard(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realAttackerCard, realDefenderCard);
  }

  attackEnemyPlayer(card: Card) {
    let realCard = this.gameState.getRealCardFromJson(card)
    this.gameLogicService.attackPlayer(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
    this.animationService.addPlayerToAnimationList(this.gameState.getPassivePlayer(), 'playerDamaged')
  }

  swapPlayers() {
    this.gameState.switchActivePlayer();  
  }

  isGameOver(): boolean {
    if(this.gameState.playerOne.health < 1 || this.gameState.playerTwo.health < 2){
      return true;
    }
    return false;
  }

}

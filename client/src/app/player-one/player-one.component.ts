import { Component} from '@angular/core';
import { DataService } from './../service/data.service';
import { Card } from '../model/Card';
import { trigger, style, state } from '@angular/animations';
import { Player } from '../model/Player';
import 'rxjs/add/operator/map';
import { StyleService } from '../service/style.service';



@Component({
  selector: 'app-player-one',
  templateUrl: './player-one.component.html',
  styleUrls: ['../css/board.css', '../css/card.css'],
  animations: [
    trigger('hoverAnimation', [
      state('true', style({
        transform: 'scale(1.4) translate(0px, -70px)',
        zIndex: 4000
      })),
      state('false', style({
        transform: 'scale(1.0)'
      })),
    ]),
    trigger('coolDownAnimation', [
      state('false', style ({ animationName: 'notOnCoolDown', animationDuration: '6s', animationIterationCount: 'infinite'}))
    ]),
    trigger('selectedCardAnimation', [
      state('true', style ({
        transform: 'scale(1.2)',
        zIndex: 4000}))
      ])
  ]})
export class PlayerOneComponent {

  selectedCard: Card;

  constructor(public dataService: DataService, private styleService: StyleService) {
  }

  onDragOver(event: any) {
    return false;
  }

  dragMyCard(event: any, card: Card) {
    event.dataTransfer.setData('card', JSON.stringify(card));
  }

  onDropMyHalf(event: any) {
    event.preventDefault();
    if (!this.isItMyTurn()) {
      alert('It\'s not your round');
      return;
    }
    const cardFromEvent = JSON.parse(event.dataTransfer.getData('card'));
    this.dataService.playCardFromHand(cardFromEvent);
    // if (this.gameService.isCardPlayAbleFromHand(cardFromEvent)) {
    //   this.gameService.PlayFromHand(cardFromEvent);
    // } else {
    //   alert('You dont have enough mana');
    // }
  }

  onCardClick(card: Card) {
    if (!this.isItMyTurn()) {
      alert('It\'s not your round');
      return;
    }
    if (!card.isAbleToAttack()) {
      alert('You cant attack with that card this turn');
      return;
    }
    this.selectedCard = card;
  }

  onEnemyCardClick(enemyCard: Card) {
    if (this.selectedCard == null) {alert('You need to select a card'); return; }
    if (!this.dataService.gameState.playerOne.isActive) {alert('It\'s not your round'); return; }
    if (!enemyCard.hasTaunt && this.dataService.gameState.playerTwo.half.cards.filter(x => x.hasTaunt).length > 0) {
      alert('There is a card with a taunt');
      return;
    }
    this.dataService.attackCard(this.selectedCard, enemyCard);
  }

  onEnemyPlayerClick(event: any) {
    if (!this.isItMyTurn()) {
      alert('It\'s not your round');
      return;
    }
    if (this.selectedCard == null) {
      alert('You need to select a Card');
      return;
    }
    if (this.dataService.gameState.playerTwo.half.cards.filter(x => x.hasTaunt).length > 0) {
      alert('There is a card with a taunt');
      return;
    }
    // if (!this.gameService.isCardAbleToAttackEnemyPlayer(this.selectedCard, this.enemyPlayer)) {
    //   alert('You cant attack the hero Now');
    //   return;
    this.dataService.attackPlayer(this.selectedCard);
  }

  endRound() {
    if (this.isItMyTurn()) {
      this.dataService.endRound();
      return;
    }
    alert('ending round');
  }

  getAttackNumberStyle(card: Card) {
    return this.styleService.getAttackNumberStyle(card);
  }

  getHealthNumberStyle(card: Card) {
    return this.styleService.getHealthNumberStyle(card);
  }

  getManaNumberStyle(card: Card) {
    return this.styleService.getManaNumberStyle(card);
  }

  getStyleForMyCard(card: Card) {
    return this.styleService.getStyleForEnemyCard(card);
  }

  getStyleForEnemyCard(card: Card) {
    return this.styleService.getStyleForEnemyCard(card);
  }

  getCharacterStyle(player: Player) {
    return this.styleService.getCharacterStyle(player);
  }

  setCardAttackingFalse(card) {
    card.isAttacking = false;
  }

  isItMyTurn(): boolean {
      return this.dataService.gameState.playerOne.isActive;
  }
}


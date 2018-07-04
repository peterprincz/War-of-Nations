import { DataService } from './../service/data.service';
import { Component, OnInit } from '@angular/core';
import { Card } from '../model/Card';
import { trigger, style, state, transition, animate, keyframes } from '@angular/animations';
import { Player } from '../model/Player';
import 'rxjs/add/operator/map';
import { StyleService } from '../service/style.service';
import { animations } from '../player-two/animations';



@Component({
  selector: 'app-player-two',
  templateUrl: './player-two.component.html',
  styleUrls: ['../css/board.css', '../css/card.css'],
  animations: animations
})
export class PlayerTwoComponent {
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
    if (this.selectedCard == null) {
      alert('You need to select a card');
      return;
    }
    if (!this.dataService.gameState.playerTwo.isActive) {
      alert('It\'s not your round');
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
      return this.dataService.gameState.playerTwo.isActive;
  }
}

import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Card } from '../model/Card';
import { Player } from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor() { }


  getAttackNumberStyle(card: Card) {
    const style: any = {};
    if (card.attack != card.baseAttack) {
      style['color'] = 'lime';
    } else {
      style['color'] = 'white';
    }
    return style;
  }

  getHealthNumberStyle(card: Card):any {
    const style: any = {};
    if (card.health != card.baseHealth) {
      style['color'] = 'lime';
    } else {
      style['color'] = 'white';
    }
    return style;
  }

  getManaNumberStyle(card: Card):any {
    const style: any = {};
    if (card.mana != card.baseMana) {
      style['color'] = 'lime';
    } else {
      style['color'] = 'white';
    }
    return style;
  }


  getStyleForMyCard(card: Card) {
    const style: any = {};
    style['background-image'] = card.getBackgroundImage();
    return style;
  }

  getStyleForEnemyCard(card: Card) {
    const style: any = {};
    style['background-image'] = card.getBackgroundImage();
    return style;
  }

  getCharacterStyle(player: Player) {
    if (player.isActive) {
      return {'background-color': 'blue', 'color': 'white'};
    }
    return {'background-color': 'red', 'color': 'white'};
  }
}

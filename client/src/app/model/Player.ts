import { Hand } from './Hand';
import { Card } from './Card';
import { Half } from './Half';

export class Player {

  name: string;
  hand: Hand;
  deck: Card[];
  mana: number;
  maximumMana: number;
  health: number;
  half: Half;
  isActive: boolean;

  constructor(hand: Hand, name: string) {
    this.hand = hand;
    this.half = new Half();
    this.health = 32;
    this.maximumMana = 1;
    this.mana = 1;
    this.deck = [];
    this.name = name;
    this.isActive = false;
  }

  onAttacked(card: Card): void {
    return;
  }
}

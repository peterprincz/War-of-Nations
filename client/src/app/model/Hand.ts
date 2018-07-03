import { Card } from './Card';

export class Hand {

  cards: Card[];
  maximumCard: number;

  constructor() {
    this.maximumCard = 6;
    this.cards = [];
  }

}

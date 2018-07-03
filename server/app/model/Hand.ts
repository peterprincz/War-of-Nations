import { Card } from "./cards/Card";

export class Hand {

  cards: Card[];
  maximumCard: number;

  constructor() {
    this.maximumCard = 6;
    this.cards = [];
  }

}

import { Hand } from "./Hand";
import { Card } from "./cards/Card";
import { Half } from "./Half";

export class Player{

  name:string;
  hand: Hand;
  deck: Card[];
  mana: number;
  maximumMana: number;
  health: number;
  half: Half;
  isActive: boolean;

  constructor(name: string, deck:Card[]){
    this.hand = new Hand();
    this.half = new Half();
    this.health = 32;
    this.maximumMana = 10;
    this.mana = 10;
    this.deck = deck;
    this.name = name;
    this.isActive = false;
  }

  onAttacked(card: Card) {
    this.health -= card.attack;
  }

  getRealCardFromJson(cardFromJson: Card){
    
  }
}

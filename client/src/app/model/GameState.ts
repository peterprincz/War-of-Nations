import { Player } from './Player';
import { Card } from './Card';
import { Hand } from './Hand';

export class GameState {

    playerOne: Player;
    playerTwo: Player;
    cards: Card[];

    constructor(playerOne: Player, playerTwo: Player, cards: Card[]) {
            this.playerOne = playerOne;
            this.playerTwo = playerTwo;
            this.cards = cards;
    }

    static getDummyGameState(): GameState {
      let playerOne: Player = new Player(new Hand(), "");
      let playerTwo: Player = new Player(new Hand(), "");
      let cards: Card[] = [];
      return new GameState(playerOne, playerTwo, cards);
    }


}

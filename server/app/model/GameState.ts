import { Player } from "./Player";
import { Card } from "./cards/Card";

export class GameState{

    playerOne: Player;
    playerTwo: Player;

    constructor(playerOne: Player,playerTwo: Player){
            this.playerOne = playerOne;
            this.playerTwo = playerTwo;
    }

    getActivePlayer():Player{
        if(this.playerOne.isActive){
            return this.playerOne;
        }
        return this.playerTwo;
    }

    getPassivePlayer():Player{
        if(!this.playerOne.isActive){
            return this.playerOne;
        }
        return this.playerTwo;
    }

    switchActivePlayer(){
        if(this.getActivePlayer() == this.playerOne){
            this.playerOne.isActive = false;
            this.playerTwo.isActive = true;
        } else {
            this.playerOne.isActive = true;
            this.playerTwo.isActive = false;
        }
    }

    static createEmptyGameState(): GameState {
        return new GameState(new Player("", []), new Player("", []));
    }

    getRealCardFromJson(cardFromJson: Card): Card {
        let realCard: Card = this.playerOne.half.cards.filter(x => cardFromJson.id == x.id)[0];
        if (realCard) { return realCard; }
        realCard = this.playerOne.hand.cards.filter(x => cardFromJson.id == x.id)[0];
        if (realCard) { return realCard; }
        realCard = this.playerOne.deck.filter(x => cardFromJson.id == x.id)[0];
        if (realCard) { return realCard; }
        realCard = this.playerTwo.half.cards.filter(x => cardFromJson.id == x.id)[0];
        if (realCard) { return realCard; }
        realCard = this.playerTwo.deck.filter(x => cardFromJson.id == x.id)[0];
        if (realCard) { return realCard; }
        realCard = this.playerTwo.hand.cards.filter(x => cardFromJson.id == x.id)[0];
        return realCard;
      }

}
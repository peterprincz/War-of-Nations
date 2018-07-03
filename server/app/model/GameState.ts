import { Player } from "./Player";

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

}
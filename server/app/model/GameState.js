var GameState = (function () {
    function GameState(playerOne, playerTwo) {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }
    GameState.prototype.getActivePlayer = function () {
        if (this.playerOne.isActive) {
            return this.playerOne;
        }
        return this.playerTwo;
    };
    GameState.prototype.getPassivePlayer = function () {
        if (!this.playerOne.isActive) {
            return this.playerOne;
        }
        return this.playerTwo;
    };
    GameState.prototype.switchActivePlayer = function () {
        if (this.getActivePlayer() == this.playerOne) {
            this.playerOne.isActive = false;
            this.playerTwo.isActive = true;
        }
        else {
            this.playerOne.isActive = true;
            this.playerTwo.isActive = false;
        }
    };
    return GameState;
})();
exports.GameState = GameState;

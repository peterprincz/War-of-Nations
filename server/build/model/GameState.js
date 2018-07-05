"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("./Player");
var GameState = /** @class */ (function () {
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
    GameState.createEmptyGameState = function () {
        return new GameState(new Player_1.Player("", []), new Player_1.Player("", []));
    };
    GameState.prototype.getRealCardFromJson = function (cardFromJson) {
        var realCard = this.playerOne.half.cards.filter(function (x) { return cardFromJson.id == x.id; })[0];
        if (realCard) {
            return realCard;
        }
        realCard = this.playerOne.hand.cards.filter(function (x) { return cardFromJson.id == x.id; })[0];
        if (realCard) {
            return realCard;
        }
        realCard = this.playerOne.deck.filter(function (x) { return cardFromJson.id == x.id; })[0];
        if (realCard) {
            return realCard;
        }
        realCard = this.playerTwo.half.cards.filter(function (x) { return cardFromJson.id == x.id; })[0];
        if (realCard) {
            return realCard;
        }
        realCard = this.playerTwo.deck.filter(function (x) { return cardFromJson.id == x.id; })[0];
        if (realCard) {
            return realCard;
        }
        realCard = this.playerTwo.hand.cards.filter(function (x) { return cardFromJson.id == x.id; })[0];
        return realCard;
    };
    return GameState;
}());
exports.GameState = GameState;

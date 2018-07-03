"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameState_1 = require("./../model/GameState");
var Player_1 = require("../model/Player");
var game_logic_service_1 = require("./game-logic.service");
var dns_1 = require("dns");
/**
 *
 * Responsible for the communicitation between the game and the server.
 * Gets instructions from the server, parses it, then handles it next to the GameLogicService
 *
 */
var GameService = /** @class */ (function () {
    function GameService(soundService) {
        this.gameLogicService = new game_logic_service_1.GameLogicService(soundService);
        this.gameState = this.createNewGame();
    }
    GameService.prototype.createNewGame = function () {
        var playerOneDeck = this.gameLogicService.createDeck();
        var playerTwoDeck = this.gameLogicService.createDeck();
        var playerOne = new Player_1.Player("béla", playerOneDeck);
        var playerTwo = new Player_1.Player("Jenő", playerTwoDeck);
        playerOne.isActive = true;
        this.gameLogicService.pullStartingCards(playerOne, playerTwo, 4);
        var gameState = new GameState_1.GameState(playerOne, playerTwo);
        return gameState;
    };
    GameService.prototype.endRound = function () {
        this.gameLogicService.endRound(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer());
        this.swapPlayers();
        this.startRound();
    };
    GameService.prototype.startRound = function () {
        this.gameLogicService.startRound(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer());
    };
    GameService.prototype.isCardPlayAbleFromHand = function (cardToPlay) {
        var realCard = this.getRealCardFromJson(cardToPlay);
        return this.gameLogicService.isCardPlayableFromHand(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
    };
    GameService.prototype.isCardAbleToAttackEnemyCard = function (attackerCard, defenderCard) {
        var realAttackerCard = this.getRealCardFromJson(attackerCard);
        return this.gameLogicService.isCardAbleToAttackEnemyCard(realAttackerCard, defenderCard);
    };
    GameService.prototype.isCardAbleToAttackEnemyPlayer = function (attackerCard) {
        var realAttackerCard = this.getRealCardFromJson(attackerCard);
        return this.gameLogicService.isCardAbleToAttackEnemyPlayer(realAttackerCard, this.gameState.getPassivePlayer());
    };
    GameService.prototype.PlayFromHand = function (card) {
        var realCard = this.getRealCardFromJson(card);
        this.gameLogicService.playFromHand(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
    };
    GameService.prototype.attackCard = function (attackerCard, defenderCard) {
        var realAttackerCard = this.getRealCardFromJson(attackerCard);
        var realDefenderCard = this.getRealCardFromJson(defenderCard);
        this.gameLogicService.attackCard(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realAttackerCard, realDefenderCard);
    };
    GameService.prototype.attackEnemyPlayer = function (card) {
        var realCard = this.getRealCardFromJson(card);
        this.gameLogicService.attackPlayer(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
    };
    GameService.prototype.getRealCardFromJson = function (card) {
        if (this.gameState.playerOne.deck.filter(function (realCard) { return realCard.id == card.id; }).length == 1) {
            return this.gameState.playerOne.deck.filter(function (realCard) { return realCard.id == card.id; })[0];
        }
        if (this.gameState.playerOne.half.cards.filter(function (realCard) { return realCard.id == card.id; }).length == 1) {
            return this.gameState.playerOne.half.cards.filter(function (realCard) { return realCard.id == card.id; })[0];
        }
        if (this.gameState.playerOne.hand.cards.filter(function (realCard) { return realCard.id == card.id; }).length == 1) {
            return this.gameState.playerOne.hand.cards.filter(function (realCard) { return realCard.id == card.id; })[0];
        }
        if (this.gameState.playerTwo.deck.filter(function (realCard) { return realCard.id == card.id; }).length == 1) {
            return this.gameState.playerTwo.deck.filter(function (realCard) { return realCard.id == card.id; })[0];
        }
        if (this.gameState.playerTwo.half.cards.filter(function (realCard) { return realCard.id == card.id; }).length == 1) {
            return this.gameState.playerTwo.half.cards.filter(function (realCard) { return realCard.id == card.id; })[0];
        }
        if (this.gameState.playerTwo.hand.cards.filter(function (realCard) { return realCard.id == card.id; }).length == 1) {
            return this.gameState.playerTwo.hand.cards.filter(function (realCard) { return realCard.id == card.id; })[0];
        }
        throw dns_1.NOTFOUND;
    };
    GameService.prototype.swapPlayers = function () {
        this.gameState.switchActivePlayer();
    };
    return GameService;
}());
exports.GameService = GameService;

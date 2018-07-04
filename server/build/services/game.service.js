"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameState_1 = require("./../model/GameState");
var Player_1 = require("../model/Player");
var game_logic_service_1 = require("./game-logic.service");
/**
 *
 * Responsible for the communicitation between the game and the server.
 * Gets instructions from the server, parses it, then handles it next to the GameLogicService
 *
 */
var GameService = /** @class */ (function () {
    function GameService(soundService, animationSerivce) {
        this.gameLogicService = new game_logic_service_1.GameLogicService(soundService, animationSerivce);
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
        var realCard = this.gameState.getRealCardFromJson(cardToPlay);
        return this.gameLogicService.isCardPlayableFromHand(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
    };
    GameService.prototype.isCardAbleToAttackEnemyCard = function (attackerCard, defenderCard) {
        var realAttackerCard = this.gameState.getRealCardFromJson(attackerCard);
        return this.gameLogicService.isCardAbleToAttackEnemyCard(realAttackerCard, defenderCard);
    };
    GameService.prototype.isCardAbleToAttackEnemyPlayer = function (attackerCard) {
        var realAttackerCard = this.gameState.getRealCardFromJson(attackerCard);
        return this.gameLogicService.isCardAbleToAttackEnemyPlayer(realAttackerCard, this.gameState.getPassivePlayer());
    };
    GameService.prototype.PlayFromHand = function (card) {
        var realCard = this.gameState.getRealCardFromJson(card);
        this.gameLogicService.playFromHand(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
    };
    GameService.prototype.attackCard = function (attackerCard, defenderCard) {
        var realAttackerCard = this.gameState.getRealCardFromJson(attackerCard);
        var realDefenderCard = this.gameState.getRealCardFromJson(defenderCard);
        this.gameLogicService.attackCard(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realAttackerCard, realDefenderCard);
    };
    GameService.prototype.attackEnemyPlayer = function (card) {
        var realCard = this.gameState.getRealCardFromJson(card);
        this.gameLogicService.attackPlayer(this.gameState.getActivePlayer(), this.gameState.getPassivePlayer(), realCard);
    };
    GameService.prototype.swapPlayers = function () {
        this.gameState.switchActivePlayer();
    };
    return GameService;
}());
exports.GameService = GameService;

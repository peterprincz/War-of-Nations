"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_logic_service_1 = require("./card-logic.service");
var player_logic_service_1 = require("./player-logic.service");
var GameLogicService = /** @class */ (function () {
    function GameLogicService(soundService, animationService) {
        this.cardLogicService = new card_logic_service_1.CardLogicService(soundService, animationService);
        this.playerLogicService = new player_logic_service_1.PlayerLogicService(animationService);
    }
    GameLogicService.prototype.pullStartingCards = function (playerOne, playerTwo, amount) {
        this.pullCardFromDeck(playerOne, amount);
        this.pullCardFromDeck(playerTwo, amount);
    };
    GameLogicService.prototype.endRound = function (activePlayer, passivePlayer) {
        var _this = this;
        activePlayer.half.cards.forEach(function (card) {
            _this.cardLogicService.onTurnEnd(activePlayer, passivePlayer, card);
        });
        passivePlayer.half.cards.forEach(function (card) {
            _this.cardLogicService.onEnemyTurnEnd(activePlayer, passivePlayer, card);
        });
        this.playerLogicService.onTurnEnd(activePlayer, passivePlayer);
    };
    GameLogicService.prototype.startRound = function (activePlayer, passivePlayer) {
        var _this = this;
        activePlayer.half.cards.forEach(function (card) {
            _this.cardLogicService.onTurnStart(activePlayer, passivePlayer, card);
        });
        this.playerLogicService.onTurnStart(activePlayer, passivePlayer);
    };
    GameLogicService.prototype.isCardPlayableFromHand = function (activePlayer, passivePlayer, card) {
        return this.playerLogicService.isCardPlayableFromHand(activePlayer, passivePlayer, card);
    };
    GameLogicService.prototype.playFromHand = function (activePlayer, passivePlayer, card) {
        this.playerLogicService.playFromHand(activePlayer, passivePlayer, card);
        this.cardLogicService.onPlayFromHand(activePlayer, passivePlayer, card);
    };
    GameLogicService.prototype.isCardAbleToAttackEnemyCard = function (attackerCard, defenderCard) {
        return this.cardLogicService.isCardAbleToAttackEnemyCard(attackerCard, defenderCard);
    };
    GameLogicService.prototype.isCardAbleToAttackEnemyPlayer = function (attackerCard, defenderPlayer) {
        return this.cardLogicService.isCardAbleToAttackEnemyPlayer(attackerCard, defenderPlayer);
    };
    GameLogicService.prototype.attackCard = function (attackerPlayer, defenderPlayer, attackerCard, defenderCard) {
        if (!this.isCardAbleToAttackEnemyCard(attackerCard, defenderCard)) {
            return;
        }
        if (!defenderCard.hasTaunt && defenderPlayer.half.cards.filter(function (x) { return x.hasTaunt; }).length > 0) {
            return;
        }
        this.cardLogicService.attackCard(attackerPlayer, defenderPlayer, attackerCard, defenderCard);
    };
    GameLogicService.prototype.attackPlayer = function (attackerPlayer, defenderPlayer, card) {
        if (!this.isCardAbleToAttackEnemyPlayer(card, defenderPlayer)) {
            return;
        }
        if (defenderPlayer.half.cards.filter(function (x) { return x.hasTaunt; }).length > 0) {
            return;
        }
        this.cardLogicService.attackPlayer(attackerPlayer, defenderPlayer, card);
    };
    GameLogicService.prototype.pullCardFromDeck = function (player, amount) {
        if (player.deck.length > 0 && player.hand.cards.length <= player.hand.maximumCard) {
            this.playerLogicService.pullCardFromDeck(player, amount);
        }
    };
    GameLogicService.prototype.createDeck = function () {
        return this.cardLogicService.createDeck();
    };
    return GameLogicService;
}());
exports.GameLogicService = GameLogicService;

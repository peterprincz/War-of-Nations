"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * Responsible for the Logic of the player Character
 * Pull Cards from deck to Hand, Increases mana in the begining of the each round's start etc
 * If in the future there will be multiple types of Player, then this functionalities needs to be shifted to the Player model
 *
 */
var PlayerLogicService = /** @class */ (function () {
    function PlayerLogicService(animationService) {
        this.animationService = animationService;
    }
    PlayerLogicService.prototype.isCardPlayableFromHand = function (activePlayer, passivePlayer, cardToPlay) {
        return cardToPlay.mana <= activePlayer.mana;
    };
    PlayerLogicService.prototype.onTurnEnd = function (activePlayer, passivePlayer) {
        return;
    };
    PlayerLogicService.prototype.onTurnStart = function (activePlayer, passivePlayer) {
        this.increaseMaximumMana(activePlayer, 1);
        this.increaseMana(activePlayer, 1);
        this.pullCardFromDeck(activePlayer, 1);
    };
    PlayerLogicService.prototype.playFromHand = function (activePlayer, passivePlayer, card) {
        activePlayer.mana -= card.mana;
        activePlayer.half.cards.push(card);
        activePlayer.hand.cards = activePlayer.hand.cards.filter(function (x) { return x.id != card.id; });
    };
    PlayerLogicService.prototype.pullCardFromDeck = function (player, amount) {
        for (var i = 0; i < amount; i++) {
            if (player.deck.length <= 0) {
                player.health -= 2;
                return;
            }
            if (player.hand.cards.length <= 8) {
                player.hand.cards.push(player.deck[0]);
                this.animationService.addCardToAnimationList(player.deck[0], "pullFromDeck");
            }
            player.deck.splice(0, 1);
        }
    };
    PlayerLogicService.prototype.increaseMana = function (player, amount) {
        if (player.mana + amount < 11) {
            player.mana += amount;
        }
        else {
            player.mana = 10;
        }
    };
    PlayerLogicService.prototype.increaseMaximumMana = function (player, amount) {
        if (player.maximumMana + amount < 11) {
            player.maximumMana += amount;
        }
        else {
            player.maximumMana = 10;
        }
    };
    return PlayerLogicService;
}());
exports.PlayerLogicService = PlayerLogicService;

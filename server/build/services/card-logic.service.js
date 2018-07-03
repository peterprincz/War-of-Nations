"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Egrivar_1 = require("../model/cards/Egrivar");
var Szamuraj_1 = require("../model/cards/Szamuraj");
var Magyarhonved_1 = require("../model/cards/Magyarhonved");
var Kereszteslovag_1 = require("../model/cards/Kereszteslovag");
var Olaszzsoldos_1 = require("../model/cards/Olaszzsoldos");
var Lovasijasz_1 = require("../model/cards/Lovasijasz");
/**
 *
 * Responsible for the communication between the Card and Card and between the Cards and the gameFlow and giving information to the animation and soundServices
 * Also connects the SoundService with the Cards
 * It has a makeCard factory method, this should always be used whenever creating a new Card, due to the unique ID generation stategy
 *
 */
var CardLogicService = /** @class */ (function () {
    function CardLogicService(soundService, animationService) {
        this.soundService = soundService;
        this.animationService = animationService;
    }
    CardLogicService.prototype.onTurnEnd = function (activePlayer, passivePlayer, card) {
        card.onTurnEnd(activePlayer, passivePlayer);
    };
    CardLogicService.prototype.onEnemyTurnEnd = function (activePlayer, passivePlayer, card) {
        card.onTurnEnd(activePlayer, passivePlayer);
    };
    CardLogicService.prototype.onTurnStart = function (activePlayer, passivePlayer, card) {
        card.onTurnStart(activePlayer, passivePlayer);
    };
    CardLogicService.prototype.onPlayFromHand = function (activePlayer, passivePlayer, card) {
        card.onPlayFromHand(activePlayer, passivePlayer);
        this.soundService.addToPlayList(card.getPlaySound());
        this.animationService.addToAnimationList(card, "playFormHand");
    };
    CardLogicService.prototype.isCardAbleToAttackEnemyCard = function (attackerCard, defenderCard) {
        return attackerCard.isAbleToAttackCard(defenderCard);
    };
    CardLogicService.prototype.isCardAbleToAttackEnemyPlayer = function (attackerCard, defenderPlayer) {
        return attackerCard.isAbleToAttackHero(defenderPlayer);
    };
    CardLogicService.prototype.attackCard = function (activePlayer, defenderPlayer, attackerCard, defenderCard) {
        attackerCard.attackCard(activePlayer, defenderPlayer, defenderCard);
        this.soundService.addToPlayList(attackerCard.getAttackSound());
        if (defenderCard.health < 1) {
            defenderCard.onDeath(activePlayer, defenderPlayer);
            this.soundService.addToPlayList(defenderCard.getDeathSound());
            defenderPlayer.half.cards = defenderPlayer.half.cards.filter(function (x) { return x != defenderCard; });
        }
        if (attackerCard.health < 1) {
            attackerCard.onDeath(activePlayer, defenderPlayer);
            this.soundService.addToPlayList(attackerCard.getDeathSound());
            activePlayer.half.cards = activePlayer.half.cards.filter(function (x) { return x != attackerCard; });
        }
    };
    CardLogicService.prototype.attackPlayer = function (activePlayer, defenderPlayer, attackerCard) {
        attackerCard.attackPlayer(activePlayer, defenderPlayer);
        this.soundService.addToPlayList(attackerCard.getAttackSound());
        if (attackerCard.health < 1) {
            attackerCard.onDeath(activePlayer, defenderPlayer);
            this.soundService.addToPlayList(attackerCard.getDeathSound());
            activePlayer.half.cards = activePlayer.half.cards.filter(function (x) { return x != attackerCard; });
        }
    };
    CardLogicService.prototype.createDeck = function () {
        var cards = [];
        for (var i = 0; i < 10; i++) {
            cards.push(this.makeCard('Egrivar'));
            cards.push(this.makeCard('Szamuraj'));
            cards.push(this.makeCard('Magyarhonved'));
            cards.push(this.makeCard('Kereszteslovag'));
            cards.push(this.makeCard('Olaszzsoldos'));
            cards.push(this.makeCard('Lovasijasz'));
        }
        return cards;
    };
    CardLogicService.prototype.makeCard = function (type) {
        if (type == 'Egrivar') {
            CardLogicService.cardId++;
            return new Egrivar_1.Egrivar(CardLogicService.cardId);
        }
        if (type == 'Szamuraj') {
            CardLogicService.cardId++;
            return new Szamuraj_1.Szamuraj(CardLogicService.cardId);
        }
        if (type == 'Magyarhonved') {
            CardLogicService.cardId++;
            return new Magyarhonved_1.Magyarhonved(CardLogicService.cardId);
        }
        if (type == 'Kereszteslovag') {
            CardLogicService.cardId++;
            return new Kereszteslovag_1.Kereszteslovag(CardLogicService.cardId);
        }
        if (type == 'Olaszzsoldos') {
            CardLogicService.cardId++;
            return new Olaszzsoldos_1.Olaszzsoldos(CardLogicService.cardId);
        }
        if (type == 'Lovasijasz') {
            CardLogicService.cardId++;
            return new Lovasijasz_1.Lovasijasz(CardLogicService.cardId);
        }
        return new Lovasijasz_1.Lovasijasz(-1);
    };
    CardLogicService.prototype.shuffle = function (array) {
        var counter = array.length;
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);
            counter--;
            var temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    };
    CardLogicService.prototype.randomNumber = function (limit) {
        return Math.floor(Math.random() * limit) + 1;
    };
    CardLogicService.cardId = 0;
    return CardLogicService;
}());
exports.CardLogicService = CardLogicService;

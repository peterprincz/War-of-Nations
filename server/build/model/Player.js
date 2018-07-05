"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hand_1 = require("./Hand");
var Half_1 = require("./Half");
var Player = /** @class */ (function () {
    function Player(name, deck) {
        this.hand = new Hand_1.Hand();
        this.half = new Half_1.Half();
        this.health = 32;
        this.maximumMana = 10;
        this.mana = 10;
        this.deck = deck;
        this.name = name;
        this.isActive = false;
        this.animations = {};
    }
    Player.prototype.onAttacked = function (card) {
        this.health -= card.attack;
    };
    return Player;
}());
exports.Player = Player;

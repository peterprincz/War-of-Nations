"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Card_1 = require("../cards/Card");
var Kereszteslovag = /** @class */ (function (_super) {
    __extends(Kereszteslovag, _super);
    function Kereszteslovag(id) {
        var _this = _super.call(this, id, 5, 7, 7) || this;
        _this.onCoolDown = true;
        _this.hasTaunt = false;
        _this.soundFolderLocation = "assets/sounds/kereszteslovag/";
        _this.backgroundImageName = "/cards/kereszteslovag.png";
        return _this;
    }
    Kereszteslovag.prototype.attackCard = function (activePlayer, defenderPlayer, enemyCard) {
        enemyCard.onAttacked(activePlayer, defenderPlayer, this);
        this.health -= enemyCard.attack;
        this.onCoolDown = true;
    };
    Kereszteslovag.prototype.attackPlayer = function (activePlayer, passivePlayer) {
        passivePlayer.onAttacked(this);
        this.onCoolDown = true;
    };
    Kereszteslovag.prototype.onTurnStart = function (activePlayer, passivePlayer) {
        this.onCoolDown = false;
    };
    Kereszteslovag.prototype.onPlayFromHand = function (activePlayer, passivePlayer) {
        return;
    };
    Kereszteslovag.prototype.onDeath = function (activePlayer, passivePlayer) {
        return;
    };
    Kereszteslovag.prototype.onTurnEnd = function (activePlayer, passivePlayer) {
        this.health += 1;
        this.attack += 1;
    };
    Kereszteslovag.prototype.onEnemyTurnEnd = function (activePlayer, passivePlayer) {
        this.health += 1;
        this.attack += 1;
    };
    return Kereszteslovag;
}(Card_1.Card));
exports.Kereszteslovag = Kereszteslovag;

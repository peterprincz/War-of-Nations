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
var Card_1 = require("./Card");
var Pap = /** @class */ (function (_super) {
    __extends(Pap, _super);
    function Pap(id) {
        var _this = _super.call(this, id, 3, 1, 1) || this;
        _this.onCoolDown = true;
        _this.hasTaunt = false;
        _this.soundFolderLocation = 'assets/sounds/pap/';
        _this.backgroundImageName = '/cards/pap.png';
        _this.healPower = 2;
        _this.onDeathSound = 'death.mp3';
        _this.onPlaySound = 'play.mp3';
        _this.onHealSound = 'heal.mp3';
        return _this;
    }
    Pap.prototype.attackPlayer = function (activePlayer, passivePlayer) {
        return;
    };
    Pap.prototype.onHealed = function (activePlayer, passivePlayer, amount) {
        return;
    };
    Pap.prototype.attackCard = function (activePlayer, defenderPlayer, enemyCard) {
        return;
    };
    Pap.prototype.onTurnEnd = function (activePlayer, passivePlayer) {
        var _this = this;
        activePlayer.half.cards.forEach(function (card) {
            card.onHealed(activePlayer, passivePlayer, _this.healPower);
        });
    };
    return Pap;
}(Card_1.Card));
exports.Pap = Pap;

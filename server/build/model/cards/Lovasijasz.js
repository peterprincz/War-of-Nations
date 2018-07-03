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
var Lovasijasz = /** @class */ (function (_super) {
    __extends(Lovasijasz, _super);
    function Lovasijasz(id) {
        var _this = _super.call(this, id, 4, 5, 4) || this;
        _this.onCoolDown = true;
        _this.hasTaunt = false;
        _this.soundFolderLocation = "assets/sounds/lovasijasz/";
        _this.backgroundImageName = "/cards/lovasijasz.png";
        _this.onAttackSound = "attack.wav";
        _this.onDeathSound = "death.wav";
        _this.onPlaySound = "play.wav";
        return _this;
    }
    Lovasijasz.prototype.attackCard = function (activePlayer, defenderPlayer, enemyCard) {
        enemyCard.onAttacked(activePlayer, defenderPlayer, this);
        this.health -= enemyCard.attack;
        this.onCoolDown = true;
        if (enemyCard.health <= 0) {
            activePlayer.mana += 2;
        }
    };
    return Lovasijasz;
}(Card_1.Card));
exports.Lovasijasz = Lovasijasz;

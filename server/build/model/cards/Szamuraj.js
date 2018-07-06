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
var Szamuraj = /** @class */ (function (_super) {
    __extends(Szamuraj, _super);
    function Szamuraj(id) {
        var _this = _super.call(this, id, 2, 9, 3) || this;
        _this.soundFolderLocation = 'assets/sounds/samuraj/';
        _this.backgroundImageName = '/cards/szamuraj.png';
        _this.onAttackSound = 'attack.ogx';
        _this.onDeathSound = 'death.ogx';
        _this.onPlaySound = 'play.ogx';
        return _this;
    }
    Szamuraj.prototype.attackCard = function (activePlayer, defenderPlayer, enemyCard) {
        enemyCard.onAttacked(activePlayer, defenderPlayer, this);
        this.health -= enemyCard.attack;
        this.onCoolDown = true;
        if (enemyCard.health > 0) {
            this.health = 0;
        }
    };
    return Szamuraj;
}(Card_1.Card));
exports.Szamuraj = Szamuraj;

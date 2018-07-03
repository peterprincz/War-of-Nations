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
var HealerCard = /** @class */ (function (_super) {
    __extends(HealerCard, _super);
    function HealerCard(id) {
        var _this = _super.call(this, id, 3, 2, 1) || this;
        _this.onCoolDown = true;
        _this.hasTaunt = false;
        _this.healPower = 1;
        _this.type = "healer";
        _this.soundFolderLocation = "assets/sounds/healer/";
        _this.backgroundImageName = "healer.png";
        return _this;
    }
    HealerCard.prototype.attackPlayer = function (activePlayer, passivePlayer) {
        return;
    };
    HealerCard.prototype.onHealed = function (activePlayer, passivePlayer, amount) {
        return;
    };
    HealerCard.prototype.attackCard = function (activePlayer, defenderPlayer, enemyCard) {
        return;
    };
    HealerCard.prototype.onTurnEnd = function (activePlayer, passivePlayer) {
        var _this = this;
        activePlayer.half.cards.forEach(function (card) {
            card.onHealed(activePlayer, passivePlayer, _this.healPower);
        });
        this.playSound("heal.ogg");
    };
    return HealerCard;
}(Card_1.Card));
exports.HealerCard = HealerCard;

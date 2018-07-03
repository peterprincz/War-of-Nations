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
var ManaSpell = /** @class */ (function (_super) {
    __extends(ManaSpell, _super);
    function ManaSpell(id) {
        var _this = _super.call(this, id, 2, null, null) || this;
        _this.onCoolDown = true;
        _this.hasTaunt = false;
        _this.soundFolderLocation = "assets/sounds/manaspell/";
        _this.backgroundImageName = "manaSpell.png";
        return _this;
    }
    ManaSpell.prototype.onPlayFromHand = function (activePlayer, passivePlayer) {
        var _this = this;
        this.playSound("play.ogg");
        activePlayer.hand.cards.forEach(function (card) {
            if (card.mana > 2) {
                card.mana -= 2;
            }
            else {
                card.mana = 0;
            }
        });
        activePlayer.half.cards = activePlayer.half.cards.filter(function (x) { return x != _this; });
    };
    return ManaSpell;
}(Card_1.Card));
exports.ManaSpell = ManaSpell;

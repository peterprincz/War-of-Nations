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
var Egrivar = /** @class */ (function (_super) {
    __extends(Egrivar, _super);
    function Egrivar(id) {
        var _this = _super.call(this, id, 5, 8, 1) || this;
        _this.onCoolDown = true;
        _this.hasTaunt = true;
        _this.soundFolderLocation = "assets/sounds/egrivar/";
        _this.backgroundImageName = "/cards/egrivar.png";
        return _this;
    }
    Egrivar.prototype.attackCard = function (activePlayer, defenderPlayer, enemyCard) {
        return;
    };
    Egrivar.prototype.attackPlayer = function (activePlayer, passivePlayer) {
        return;
    };
    Egrivar.prototype.onTurnStart = function (activePlayer, passivePlayer) {
        return;
    };
    return Egrivar;
}(Card_1.Card));
exports.Egrivar = Egrivar;

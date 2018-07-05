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
var LengyelHuszar = /** @class */ (function (_super) {
    __extends(LengyelHuszar, _super);
    function LengyelHuszar(id) {
        var _this = _super.call(this, id, 3, 3, 3) || this;
        _this.onCoolDown = true;
        _this.hasTaunt = false;
        _this.soundFolderLocation = "assets/sounds/lengyelhuszar/";
        _this.backgroundImageName = "/cards/lengyelhuszar.png";
        _this.onAttackSound = "attack.wav";
        _this.onDeathSound = "death.wav";
        _this.onPlaySound = "play.wav";
        return _this;
    }
    LengyelHuszar.prototype.onPlayFromHand = function (activePlayer, passivePlayer) {
        this.onCoolDown = false;
    };
    return LengyelHuszar;
}(Card_1.Card));
exports.LengyelHuszar = LengyelHuszar;

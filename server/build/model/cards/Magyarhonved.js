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
var Magyarhonved = /** @class */ (function (_super) {
    __extends(Magyarhonved, _super);
    function Magyarhonved(id) {
        var _this = _super.call(this, id, 1, 1, 2) || this;
        _this.onCoolDown = true;
        _this.hasTaunt = false;
        _this.soundFolderLocation = 'assets/sounds/honved/';
        _this.backgroundImageName = '/cards/magyarhonved.png';
        _this.onAttackSound = 'attack.mp3';
        _this.onDeathSound = 'death.mp3';
        _this.onPlaySound = 'play.mp3';
        return _this;
    }
    return Magyarhonved;
}(Card_1.Card));
exports.Magyarhonved = Magyarhonved;

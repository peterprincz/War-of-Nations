var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card_1 = require('../cards/Card');
var Magyarhonved = (function (_super) {
    __extends(Magyarhonved, _super);
    function Magyarhonved(id) {
        _super.call(this, id, 1, 1, 2);
        this.onCoolDown = true;
        this.hasTaunt = false;
        this.soundFolderLocation = 'assets/sounds/honved/';
        this.backgroundImageName = '/cards/magyarhonved.png';
        this.onAttackSound = 'attack.mp3';
        this.onDeathSound = 'death.mp3';
        this.onPlaySound = 'play.mp3';
    }
    return Magyarhonved;
})(Card_1.Card);
exports.Magyarhonved = Magyarhonved;

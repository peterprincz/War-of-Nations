var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card_1 = require('../cards/Card');
var Olaszzsoldos = (function (_super) {
    __extends(Olaszzsoldos, _super);
    function Olaszzsoldos(id) {
        _super.call(this, id, 2, 3, 6);
        this.onCoolDown = true;
        this.hasTaunt = false;
        this.soundFolderLocation = 'assets/sounds/olaszzsoldos/';
        this.backgroundImageName = '/cards/olaszzsoldos.png';
        this.onAttackSound = 'attack.mp3';
        this.onDeathSound = 'death.mp3';
        this.onPlaySound = 'play.mp3';
    }
    return Olaszzsoldos;
})(Card_1.Card);
exports.Olaszzsoldos = Olaszzsoldos;

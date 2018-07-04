var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card_1 = require("../cards/Card");
var Lovasijasz = (function (_super) {
    __extends(Lovasijasz, _super);
    function Lovasijasz(id) {
        _super.call(this, id, 4, 5, 4);
        this.onCoolDown = true;
        this.hasTaunt = false;
        this.soundFolderLocation = "assets/sounds/lovasijasz/";
        this.backgroundImageName = "/cards/lovasijasz.png";
        this.onAttackSound = "attack.wav";
        this.onDeathSound = "death.wav";
        this.onPlaySound = "play.wav";
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
})(Card_1.Card);
exports.Lovasijasz = Lovasijasz;

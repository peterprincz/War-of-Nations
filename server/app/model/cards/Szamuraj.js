var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card_1 = require('../cards/Card');
var Szamuraj = (function (_super) {
    __extends(Szamuraj, _super);
    function Szamuraj(id) {
        _super.call(this, id, 2, 9, 3);
        this.onCoolDown = true;
        this.hasTaunt = false;
        this.soundFolderLocation = 'assets/sounds/samuraj/';
        this.backgroundImageName = '/cards/szamuraj.png';
        this.onAttackSound = 'attack.ogx';
        this.onDeathSound = 'death.ogx';
        this.onPlaySound = 'play.ogx';
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
})(Card_1.Card);
exports.Szamuraj = Szamuraj;

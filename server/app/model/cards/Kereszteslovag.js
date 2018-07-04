var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card_1 = require("../cards/Card");
var Kereszteslovag = (function (_super) {
    __extends(Kereszteslovag, _super);
    function Kereszteslovag(id) {
        _super.call(this, id, 5, 7, 7);
        this.onCoolDown = true;
        this.hasTaunt = false;
        this.soundFolderLocation = "assets/sounds/kereszteslovag/";
        this.backgroundImageName = "/cards/kereszteslovag.png";
    }
    Kereszteslovag.prototype.attackCard = function (activePlayer, defenderPlayer, enemyCard) {
        enemyCard.onAttacked(activePlayer, defenderPlayer, this);
        this.health -= enemyCard.attack;
        this.onCoolDown = true;
    };
    Kereszteslovag.prototype.attackPlayer = function (activePlayer, passivePlayer) {
        passivePlayer.onAttacked(this);
        this.onCoolDown = true;
    };
    Kereszteslovag.prototype.onTurnStart = function (activePlayer, passivePlayer) {
        this.onCoolDown = false;
    };
    Kereszteslovag.prototype.onPlayFromHand = function (activePlayer, passivePlayer) {
        return;
    };
    Kereszteslovag.prototype.onDeath = function (activePlayer, passivePlayer) {
        return;
    };
    Kereszteslovag.prototype.onTurnEnd = function (activePlayer, passivePlayer) {
        this.health += 1;
        this.attack += 1;
    };
    Kereszteslovag.prototype.onEnemyTurnEnd = function (activePlayer, passivePlayer) {
        this.health += 1;
        this.attack += 1;
    };
    return Kereszteslovag;
})(Card_1.Card);
exports.Kereszteslovag = Kereszteslovag;

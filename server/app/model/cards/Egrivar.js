var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Card_1 = require("../cards/Card");
var Egrivar = (function (_super) {
    __extends(Egrivar, _super);
    function Egrivar(id) {
        _super.call(this, id, 5, 8, 1);
        this.onCoolDown = true;
        this.hasTaunt = true;
        this.soundFolderLocation = "assets/sounds/egrivar/";
        this.backgroundImageName = "/cards/egrivar.png";
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
})(Card_1.Card);
exports.Egrivar = Egrivar;

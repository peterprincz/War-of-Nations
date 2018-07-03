"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = /** @class */ (function () {
    function Card(id, mana, health, attack) {
        this.id = id;
        this.mana = mana;
        this.baseMana = mana;
        this.health = health;
        this.baseHealth = health;
        this.attack = attack;
        this.baseAttack = attack;
        this.backgroundImageName = 'placeholder.png';
        this.isAttacking = false;
        this.onCoolDown = true;
        this.hasTaunt = false;
        this.onPlaySound = "";
        this.onDeathSound = "";
        this.onAttackSound = "";
        this.soundFolderLocation = "";
    }
    Card.prototype.attackCard = function (activePlayer, defenderPlayer, enemyCard) {
        enemyCard.onAttacked(activePlayer, defenderPlayer, this);
        this.health -= enemyCard.attack;
        this.onCoolDown = true;
    };
    Card.prototype.onPlayFromHand = function (activePlayer, passivePlayer) {
        return;
    };
    Card.prototype.onDeath = function (activePlayer, passivePlayer) {
        return;
    };
    Card.prototype.attackPlayer = function (activePlayer, passivePlayer) {
        passivePlayer.onAttacked(this);
        this.onCoolDown = true;
    };
    Card.prototype.onTurnEnd = function (activePlayer, passivePlayer) {
        return;
    };
    Card.prototype.onEnemyTurnEnd = function (activePlayer, passivePlayer) {
        return;
    };
    Card.prototype.onTurnStart = function (activePlayer, passivePlayer) {
        this.onCoolDown = false;
    };
    Card.prototype.onAttacked = function (activePlayer, passivePlayer, card) {
        this.health -= card.attack;
    };
    Card.prototype.onHealed = function (activePlayer, passivePlayer, amount) {
        this.health += amount;
    };
    Card.prototype.isAbleToAttack = function (activePlayer, passivePlayer) {
        return !this.onCoolDown;
    };
    Card.prototype.isAbleToAttackCard = function (defenderCard) {
        return !this.onCoolDown;
    };
    Card.prototype.isAbleToAttackHero = function (passivePlayer) {
        return !this.onCoolDown;
    };
    Card.prototype.getBorderStyle = function () {
        return '4px solid white';
    };
    Card.prototype.getBackgroundImage = function () {
        return 'url(\'/assets/img/' + this.backgroundImageName + '\'';
    };
    Card.prototype.isDamaged = function () {
        return !(this.health == this.baseHealth);
    };
    Card.prototype.setCardAttackingFalse = function (card) {
        card.isAttacking = false;
    };
    Card.prototype.getAttackSound = function () {
        return this.soundFolderLocation + this.onAttackSound;
    };
    Card.prototype.getPlaySound = function () {
        return this.soundFolderLocation + this.onPlaySound;
    };
    Card.prototype.getDeathSound = function () {
        return this.soundFolderLocation + this.onDeathSound;
    };
    return Card;
}());
exports.Card = Card;

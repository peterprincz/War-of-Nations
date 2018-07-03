import { Player } from '../Player';

export class Card {

  id: number;
  baseHealth: number;
  baseAttack: number;
  baseMana: number;
  mana: number;
  health: number;
  attack: number;
  onCoolDown: boolean;
  hasTaunt: boolean;
  onPlaySound: string;
  onDeathSound: string;
  onAttackSound: string;
  isAttacking: boolean;
  soundFolderLocation: string;
  backgroundImageName: string;

  constructor(id: number, mana: number, health: number, attack: number) {
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
    this.onPlaySound= "";
    this.onDeathSound = "";
    this.onAttackSound = "";
    this.soundFolderLocation = "";
  }


  attackCard(activePlayer: Player, defenderPlayer: Player, enemyCard: Card) {
    enemyCard.onAttacked(activePlayer, defenderPlayer, this);
    this.health -= enemyCard.attack;
    this.onCoolDown = true;
  }


  onPlayFromHand(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onDeath(activePlayer: Player, passivePlayer: Player){
    return;
  }

  attackPlayer(activePlayer: Player, passivePlayer: Player) {
    passivePlayer.onAttacked(this);
    this.onCoolDown = true;
  }

  onTurnEnd(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onEnemyTurnEnd(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onTurnStart(activePlayer: Player, passivePlayer: Player){
    this.onCoolDown = false;
  }

  onAttacked(activePlayer: Player, passivePlayer: Player, card: Card){
    this.health -= card.attack;
  }

  onHealed(activePlayer: Player, passivePlayer: Player, amount: number) {
    this.health += amount;
  }

  isAbleToAttack(activePlayer: Player, passivePlayer: Player) {
    return !this.onCoolDown;
  }

  isAbleToAttackCard(defenderCard: Card) {
    return !this.onCoolDown;
  }

  isAbleToAttackHero(passivePlayer: Player) {
    return !this.onCoolDown;
  }

  getBorderStyle(): string {
    return '4px solid white';
  }

  getBackgroundImage() {
    return 'url(\'/assets/img/' + this.backgroundImageName + '\'';
  }

  isDamaged(): boolean {
    return !(this.health == this.baseHealth);
  }

  setCardAttackingFalse(card:Card) {
    card.isAttacking = false;
  }

  getAttackSound(){
    return this.soundFolderLocation + this.onAttackSound;
  }

  getPlaySound(){
    return this.soundFolderLocation + this.onPlaySound;
  }

  getDeathSound(){
    return this.soundFolderLocation + this.onDeathSound;
  }



}

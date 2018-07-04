import { Player } from '../model/Player';

export class Card {

  id: number;
  type: string;
  baseHealth: number;
  baseAttack: number;
  baseMana: number;
  mana: number;
  health: number;
  attack: number;
  onCoolDown: boolean;
  hasTaunt: boolean;

  isAttacking: boolean;
  soundFolderLocation: string;
  audio: any;
  onPlaySound: string;
  onDeathSound: string;
  onAttackSound: string;
  backgroundImageName: string;
  hasJustPlayed: boolean;
  hasJustPulled: boolean;
  hasJustAttackedCard: boolean;
  hasJustAttackedPlayer: boolean;
  hasJustGotDamaged: boolean;

  constructor(cardFromServer: any) {
    this.id = cardFromServer.id;
    this.mana = cardFromServer.mana;
    this.baseMana = cardFromServer.baseMana;
    this.health = cardFromServer.health;
    this.baseHealth = cardFromServer.baseHealth;
    this.attack = cardFromServer.attack;
    this.baseAttack = cardFromServer.baseAttack;
    this.onCoolDown = cardFromServer.onCoolDown;

    this.audio = new Audio();
    this.audio.volume = '0.2';
    this.backgroundImageName = cardFromServer.backgroundImageName;
    this.isAttacking = false;
    this.onPlaySound = cardFromServer.onPlaySound;
    this.onDeathSound = cardFromServer.onDeathSound;
    this.onAttackSound = cardFromServer.onAttackSound;
    this.soundFolderLocation = cardFromServer.soundFolderLocation;
  }


  attackCard(activePlayer: Player, defenderPlayer: Player, enemyCard: Card) {
    return;
  }


  onPlayFromHand(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onDeath(activePlayer: Player, passivePlayer: Player){
    return;
  }

  attackPlayer(activePlayer: Player, passivePlayer: Player) {
    return;
  }

  onTurnEnd(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onEnemyTurnEnd(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onTurnStart(activePlayer: Player, passivePlayer: Player){
    return;
  }

  onAttacked(activePlayer: Player, passivePlayer: Player, card: Card){
    return;
  }

  onHealed(activePlayer: Player, passivePlayer: Player, amount: number) {
    return;
  }

  isAbleToAttack() {
    return !this.onCoolDown;
  }

  isAbleToAttackCard() {
    return !this.onCoolDown;
  }

  isAbleToAttackHero() {
    return !this.onCoolDown;
  }

  getBorderStyle(): string {
    return '4px solid white';
  }

  playSound(fileName: string) {
    this.audio.src = this.soundFolderLocation + fileName;
    this.audio.play();
  }

  getBackgroundImage() {
    return 'url(\'/assets/img/' + this.backgroundImageName + '\'';
  }

  isDamaged(): boolean {
    return !(this.health == this.baseHealth);
  }


  public toString = (): string => {
    return this.id + ' ' + this.type + ' ' + this.mana + ' ' + this.health + ' ' + this.attack;
  }

  setCardAttackingFalse(card) {
    card.isAttacking = false;
  }



}

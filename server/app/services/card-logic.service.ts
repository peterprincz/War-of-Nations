import { SoundService } from './sound.service';
import { Card } from '../model/cards/Card';
import { Player } from '../model/Player';
import { Egrivar } from '../model/cards/Egrivar';
import { Szamuraj } from '../model/cards/Szamuraj';
import { Magyarhonved } from '../model/cards/Magyarhonved';
import { Kereszteslovag } from '../model/cards/Kereszteslovag';
import { Olaszzsoldos } from '../model/cards/Olaszzsoldos';
import { Lovasijasz } from '../model/cards/Lovasijasz';


/**
 * 
 * Responsible for the communication between the Card and Card and between the Cards and the gameFlow
 * Also connects the SoundService with the Cards
 * It has a makeCard factory method, this should always be used whenever creating a new Card, due to the unique ID generation stategy
 *    
 */


export class CardLogicService {

  static cardId:number = 0;

  soundService: SoundService;

  constructor(soundService: SoundService) { 
    this.soundService = soundService;
  }

  onTurnEnd(activePlayer:Player, passivePlayer:Player, card:Card): void{
    card.onTurnEnd(activePlayer, passivePlayer);
  }

  onEnemyTurnEnd(activePlayer:Player, passivePlayer:Player, card:Card): void{
    card.onTurnEnd(activePlayer, passivePlayer);
  }

  onTurnStart(activePlayer:Player, passivePlayer:Player, card:Card): void{
    card.onTurnStart(activePlayer, passivePlayer);
  }

  onPlayFromHand(activePlayer:Player, passivePlayer:Player, card:Card){
    card.onPlayFromHand(activePlayer, passivePlayer);
    this.soundService.addToPlayList(card.getPlaySound());
  }

  isCardAbleToAttackEnemyCard(attackerCard:Card, defenderCard:Card) : boolean {
    return attackerCard.isAbleToAttackCard(defenderCard);
  }

  isCardAbleToAttackEnemyPlayer(attackerCard:Card, defenderPlayer:Player) : boolean {
    return attackerCard.isAbleToAttackHero(defenderPlayer);
  }

  attackCard(activePlayer:Player, defenderPlayer:Player,  attackerCard:Card, defenderCard:Card){
    attackerCard.attackCard(activePlayer, defenderPlayer, defenderCard);
    this.soundService.addToPlayList(attackerCard.getAttackSound());
    if(defenderCard.health < 1){
      defenderCard.onDeath(activePlayer, defenderPlayer);
      this.soundService.addToPlayList(defenderCard.getDeathSound());
      defenderPlayer.half.cards = defenderPlayer.half.cards.filter(x => x != defenderCard);
    }
    if(attackerCard.health < 1){
      attackerCard.onDeath(activePlayer, defenderPlayer);
      this.soundService.addToPlayList(attackerCard.getDeathSound());
      activePlayer.half.cards = activePlayer.half.cards.filter(x => x != attackerCard);
    }
  }

  attackPlayer(activePlayer:Player, defenderPlayer:Player,  attackerCard:Card){
    attackerCard.attackPlayer(activePlayer, defenderPlayer);
    this.soundService.addToPlayList(attackerCard.getAttackSound());
    if(attackerCard.health < 1){
      attackerCard.onDeath(activePlayer, defenderPlayer);
      this.soundService.addToPlayList(attackerCard.getDeathSound());
      activePlayer.half.cards = activePlayer.half.cards.filter(x => x != attackerCard);
    }
  }

  createDeck(): Card[] {
    let cards: Card[] = [];
    for (let i = 0; i < 10; i++){
      cards.push(this.makeCard('Egrivar'));
      cards.push(this.makeCard('Szamuraj'));
      cards.push(this.makeCard('Magyarhonved'));
      cards.push(this.makeCard('Kereszteslovag'));
      cards.push(this.makeCard('Olaszzsoldos'));
      cards.push(this.makeCard('Lovasijasz'));
    }
    return cards;
  }

  makeCard(type:string): Card {
    if(type == 'Egrivar')           {CardLogicService.cardId++;   return new Egrivar(CardLogicService.cardId)}
    if(type == 'Szamuraj')          {CardLogicService.cardId++;   return new Szamuraj(CardLogicService.cardId)}
    if(type == 'Magyarhonved')      {CardLogicService.cardId++;   return new Magyarhonved(CardLogicService.cardId)}
    if(type == 'Kereszteslovag')    {CardLogicService.cardId++;   return new Kereszteslovag(CardLogicService.cardId)}
    if(type == 'Olaszzsoldos')      {CardLogicService.cardId++;   return new Olaszzsoldos(CardLogicService.cardId)}
    if(type == 'Lovasijasz')        {CardLogicService.cardId++;   return new Lovasijasz(CardLogicService.cardId)}
    return new Lovasijasz(-1);
  }

  shuffle(array: any) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
  }

  randomNumber(limit:number): number {
    return  Math.floor(Math.random() * limit) + 1;
  }

}

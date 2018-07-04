import { SoundService } from './sound.service';
import {Animation} from './animation.service';
import { GameState } from './../model/GameState';
import { Injectable } from '@angular/core';
import { SocketService } from './SocketService';
import { Card } from '../model/Card';
import { Http } from '@angular/http';
import { AnimationService } from './animation.service';

export enum Event {CONNECT = 'connect', DISCONNECT = 'disconnect'}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  gameState: GameState;

  constructor(private socketService: SocketService,
              private animationService: AnimationService,
              private http: Http,
              private soundService: SoundService) {
    this.gameState = GameState.getDummyGameState();
    this.setUpConnection();
    this.getNewGameStateFromServer();
  }

  public setUpConnection(): void {
    this.socketService.initSocket();
    this.setUpSockets();
  }

  private setUpSockets() {
    this.socketService.onClientJoined()
      .subscribe((data: string) => {
        console.log(data);
        this.getNewGameStateFromServer();
    });

    this.socketService.onChangeInGameState()
    .subscribe((data: string) => {
      console.log(data);
      this.getNewGameStateFromServer();
    });

    this.socketService.onChangeInPlayList()
    .subscribe((data: string[]) => {
      this.soundService.playSounds(data);
    });

    this.socketService.onChangeInAnimationList()
    .subscribe((data: Animation[]) => {
      this.animationService.playAnimations(this.gameState, data);
    });

    this.socketService.onWarningMessage()
    .subscribe((data: string) => {
      console.log(data);
    });

    this.socketService.onEvent(Event.CONNECT)
    .subscribe(() => {
      console.log('connected to the server');
      this.socketService.sendJoinedSignal('message');
    });

    this.socketService.onEvent(Event.DISCONNECT)
    .subscribe(() => {
        console.log('disconnected from the server');
    });
  }

  private getNewGameStateFromServer(): void {
    this.http.get('http://localhost:8080/gamestate')
    .map(res => res.json())
    .subscribe((data: GameState) => {
      this.gameState.cards = data.cards;
      this.gameState.playerOne = data.playerOne;
      this.gameState.playerTwo = data.playerTwo;
      this.processGameStateJson();
    });
  }

  public playCardFromHand(card: Card) {
    this.socketService.playCard(card);
  }

  public attackCard(attackerCard: Card, defenderCard: Card) {
    this.socketService.attackCard(attackerCard, defenderCard);
  }

  public attackPlayer(attackerCard: Card) {
    this.socketService.attackPlayer(attackerCard);
  }

  public endRound() {
    this.socketService.endRound();
  }

  processGameStateJson(): void {
    this.gameState.playerOne.deck                   = this.gameState.playerOne.deck.map(x => new Card(x));
    this.gameState.playerOne.hand.cards             = this.gameState.playerOne.hand.cards.map(x => new Card(x));
    this.gameState.playerOne.half.cards             = this.gameState.playerOne.half.cards.map(x => new Card(x));
    this.gameState.playerTwo.deck                   = this.gameState.playerTwo.deck.map(x => new Card(x));
    this.gameState.playerTwo.hand.cards             = this.gameState.playerTwo.hand.cards.map(x => new Card(x));
    this.gameState.playerTwo.half.cards             = this.gameState.playerTwo.half.cards.map(x => new Card(x));
  }
}

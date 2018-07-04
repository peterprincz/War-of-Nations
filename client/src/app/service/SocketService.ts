import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as socketIo from 'socket.io-client';
import { Card } from '../model/Card';

const SERVER_URL = 'http://localhost:8080';
export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

@Injectable()
export class SocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public sendJoinedSignal(message: string): void {
    this.socket.emit('clientJoined', 'A client has made the handshake');
  }

  public playCard(playedCard: Card): void {
    this.socket.emit('playCard', { playedCard: playedCard });
  }

  public endRound(): void {
    this.socket.emit('endRound', {});
  }

  public attackCard(attackerCard: Card, defenderCard: Card) {
    this.socket.emit('attackCard', {
      attackerCard: attackerCard,
      defenderCard: defenderCard
    });
  }

  public attackPlayer(attackerCard: Card) {
    this.socket.emit('attackPlayer', { attackerCard: attackerCard });
  }

  public onChangeInGameState(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('changeInGameState', (data: string) =>
        observer.next(data)
      );
    });
  }

  public onChangeInPlayList(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('changeInPlayList', (data: any) =>
        observer.next(data)
      );
    });
  }

  public onChangeInAnimationList(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('changeInAnimationList', (data: any) =>
        observer.next(data)
      );
    });
  }

  public onWarningMessage(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('warningMessage', (data: string) => observer.next(data));
    });
  }

  public onClientJoined(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('clientJoined', (data: string) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}

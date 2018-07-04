import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  playSounds(sounds: string[]) {
    let player: any = new Audio();
    sounds.forEach(sound => {
      player.src = sound;
      player.play();
    });
  }
}

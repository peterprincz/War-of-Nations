import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  playSounds(sounds: string[]) {
    sounds.forEach(sound => {
      let player: any = new Audio();
      player.src = sound;
      player.play();
    });
  }
}

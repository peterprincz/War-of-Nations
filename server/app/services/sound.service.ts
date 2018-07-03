export class SoundService {

    playList: string[];

    constructor() {
        this.playList = [];
    }

    addToPlayList(sound:string){
        this.playList.push(sound);
    }

    emptyPlayList(){
        this.playList = [];
    }

    isPlayListEmpty(){
        return this.playList.length == 0;
    }

}
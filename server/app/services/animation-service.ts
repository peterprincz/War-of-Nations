import { Card } from "../model/cards/Card";
import { Player } from "../model/Player";

export class AnimationService{

    animationList: Animation[];

    constructor() {
        this.animationList = [];
    }

    addToAnimationList(target:Card|Player, animation:string){
        this.animationList.push(new Animation(target, animation));
    }

    emptyAnimationList(){
        this.animationList = [];
    }

    isAnimationListEmpty(){
        return this.animationList.length == 0;
    }


}

export class Animation {

    target:Card | Player;
    animation:string;

    constructor(target:Card | Player, animation:string){
        this.target = target;
        this.animation = animation;
    }


}
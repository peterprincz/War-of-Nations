import { Card } from "../model/cards/Card";
import { Player } from "../model/Player";

export class AnimationService{

    animationList: Animation[];

    constructor() {
        this.animationList = [];
    }

    addCardToAnimationList(target:Card, animation:string){
        this.animationList.push(new Animation(target,"card", animation));
    }

    addPlayerToAnimationList(target:Player, animation:string){
        this.animationList.push(new Animation(target,"player", animation));
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
    type: string;
    animation:string;

    constructor(target:Card | Player, type:string, animation:string){
        this.target = target;
        this.type = type;
        this.animation = animation;
    }


}
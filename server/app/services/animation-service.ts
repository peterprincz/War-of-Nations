import { Card } from "../model/cards/Card";

export class AnimationService{

    animationList: Animation[];

    constructor() {
        this.animationList = [];
    }

    addToAnimationList(card:Card, animation:string){
        this.animationList.push(new Animation(card, animation));
    }

    emptyAnimationList(){
        this.animationList = [];
    }

    isAnimationListEmpty(){
        return this.animationList.length == 0;
    }


}

export class Animation {

    card:Card;
    animation:string;

    constructor(card:Card, animation:string){
        this.card = card;
        this.animation = animation;
    }


}
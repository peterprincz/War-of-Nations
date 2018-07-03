"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationService = /** @class */ (function () {
    function AnimationService() {
        this.animationList = [];
    }
    AnimationService.prototype.addToAnimationList = function (card, animation) {
        this.animationList.push(new Animation(card, animation));
    };
    AnimationService.prototype.emptyAnimationList = function () {
        this.animationList = [];
    };
    AnimationService.prototype.isAnimationListEmpty = function () {
        return this.animationList.length == 0;
    };
    return AnimationService;
}());
exports.AnimationService = AnimationService;
var Animation = /** @class */ (function () {
    function Animation(card, animation) {
        this.card = card;
        this.animation = animation;
    }
    return Animation;
}());
exports.Animation = Animation;

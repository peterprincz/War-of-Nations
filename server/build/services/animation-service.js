"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationService = /** @class */ (function () {
    function AnimationService() {
        this.animationList = [];
    }
    AnimationService.prototype.addCardToAnimationList = function (target, animation) {
        this.animationList.push(new Animation(target, "card", animation));
    };
    AnimationService.prototype.addPlayerToAnimationList = function (target, animation) {
        this.animationList.push(new Animation(target, "player", animation));
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
    function Animation(target, type, animation) {
        this.target = target;
        this.type = type;
        this.animation = animation;
    }
    return Animation;
}());
exports.Animation = Animation;

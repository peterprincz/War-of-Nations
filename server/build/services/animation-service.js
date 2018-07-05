"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnimationService = /** @class */ (function () {
    function AnimationService() {
        this.animationList = [];
    }
    AnimationService.prototype.addToAnimationList = function (target, animation) {
        this.animationList.push(new Animation(target, animation));
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
    function Animation(target, animation) {
        this.target = target;
        this.animation = animation;
    }
    return Animation;
}());
exports.Animation = Animation;

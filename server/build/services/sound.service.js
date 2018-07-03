"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundService = /** @class */ (function () {
    function SoundService() {
        this.playList = [];
    }
    SoundService.prototype.addToPlayList = function (sound) {
        this.playList.push(sound);
    };
    SoundService.prototype.emptyPlayList = function () {
        this.playList = [];
    };
    SoundService.prototype.isPlayListEmpty = function () {
        return this.playList.length == 0;
    };
    return SoundService;
}());
exports.SoundService = SoundService;

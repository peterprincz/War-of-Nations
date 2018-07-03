"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Memdao = /** @class */ (function () {
    function Memdao() {
        this.chat = [];
    }
    Memdao.prototype.addmessage = function (message) {
        this.chat.push(message);
    };
    Memdao.prototype.getChat = function () {
        return this.chat;
    };
    return Memdao;
}());
exports.Memdao = Memdao;

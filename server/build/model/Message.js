"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(author, message) {
        this.author = author;
        this.message = message;
    }
    Message.prototype.getMessage = function () {
        return this.author + ": " + this.message;
    };
    return Message;
}());
exports.Message = Message;

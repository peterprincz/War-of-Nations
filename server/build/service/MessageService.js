"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../model/Message");
var MessageService = /** @class */ (function () {
    function MessageService(memdao) {
        this.memdao = memdao;
    }
    MessageService.prototype.getMessages = function () {
        return this.memdao.getChat();
    };
    MessageService.prototype.addmessage = function (author, message) {
        this.memdao.addmessage(new Message_1.Message(author, message));
    };
    return MessageService;
}());
exports.MessageService = MessageService;

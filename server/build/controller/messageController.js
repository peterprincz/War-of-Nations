"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageService_1 = require("./../service/MessageService");
// Import only what we need from express
var express_1 = require("express");
var Memdao_1 = require("../dao/Memdao");
// Assign router to the express.Router() instance
var router = express_1.Router();
var messageService = new MessageService_1.MessageService(new Memdao_1.Memdao());
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', function (req, res) {
    // Reply with a hello world when no name param is provided
    res.send('Hello, World!');
});
router.get('/:name', function (req, res) {
    // Extract the name from the request parameters
    var name = req.params.name;
    messageService.addmessage(name, "newMessage");
    // Greet the given name
    res.send(messageService.getMessages());
});
// Export the express.Router() instance to be used by server.ts
exports.MessageController = router;

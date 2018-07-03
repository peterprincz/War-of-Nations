"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_service_1 = require("./../services/game.service");
// Import only what we need from express
var express_1 = require("express");
// Assign router to the express.Router() instance
var router = express_1.Router();
var gameService = new game_service_1.GameService();
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', function (req, res) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "true");
    // Reply with a hello world when no name param is provided
    res.send(gameService.getGameState());
});
router.get('/playfromhand', function (req, res) {
    // Reply with a hello world when no name param is provided
    gameService.PlayFromHand(gameService.gameState.cards[1]);
    res.send(gameService.getGameState());
});
// Export the express.Router() instance to be used by server.ts
exports.GameController = router;

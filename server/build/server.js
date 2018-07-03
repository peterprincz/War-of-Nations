"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sound_service_1 = require("./services/sound.service");
var game_service_1 = require("./services/game.service");
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var GameServer = /** @class */ (function () {
    function GameServer() {
        this.app = express();
        this.port = process.env.PORT || GameServer.PORT;
        this.server = http_1.createServer(this.app);
        this.io = socketIo(this.server);
        this.soundService = new sound_service_1.SoundService();
        this.gameService = new game_service_1.GameService(this.soundService);
        this.listen();
    }
    GameServer.prototype.listen = function () {
        var _this = this;
        this.app.get('/gamestate', function (req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(_this.gameService.gameState);
        });
        this.app.get('/newGame', function (req, res) {
            _this.gameService.gameState = _this.gameService.createNewGame();
            res.send("new Game started");
        });
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            socket.on('clientJoined', function (m) {
                console.log("A client has joined to the Server:" + m);
                _this.io.emit('clientJoined', "A client has joined");
                _this.io.emit('changeInGameState', "A change has happened in the gameState");
            });
            socket.on('playCard', function (data) {
                console.log("A playCard request came from a client");
                if (!_this.gameService.isCardPlayAbleFromHand(data.playedCard)) {
                    console.log("Invalid playCard request");
                    _this.io.emit('warningMessage', "you cant play that Card");
                    return;
                }
                _this.gameService.PlayFromHand(data.playedCard);
                _this.io.emit('changeInGameState', "A change has happened in the gameState");
                console.log("playing Card...");
                _this.sendSoundPlayList();
            });
            socket.on('attackCard', function (data) {
                console.log("An attackPlayer request came from a client");
                if (!_this.gameService.isCardAbleToAttackEnemyCard(data.attackerCard, data.defenderCard)) {
                    console.log("Invalid attackPlayer request");
                    _this.io.emit('warningMessage', "you cant attack that Card");
                    return;
                }
                _this.gameService.attackCard(data.attackerCard, data.defenderCard);
                _this.io.emit('changeInGameState', "A change has happened in the gameState");
                console.log("Attacking Card...");
                _this.sendSoundPlayList();
            });
            socket.on('attackPlayer', function (data) {
                console.log("An attackPlayer request came from a client");
                if (!_this.gameService.isCardAbleToAttackEnemyPlayer(data.attackerCard)) {
                    console.log("The attackPlayer request was invalid");
                    _this.io.emit('warningMessage', "you cant attack the Hero");
                    return;
                }
                _this.gameService.attackEnemyPlayer(data.attackerCard);
                _this.io.emit('changeInGameState', "A change has happened in the gameState");
                console.log("Attacking Player...");
                _this.sendSoundPlayList();
            });
            socket.on('endRound', function (data) {
                console.log("An endRound request came from a client");
                _this.gameService.endRound();
                console.log("Ending round...");
                _this.io.emit('changeInGameState', "A change has happened in the gameState");
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
        });
    };
    GameServer.prototype.sendSoundPlayList = function () {
        if (!this.soundService.isPlayListEmpty()) {
            this.io.emit('changeInPlayList', this.soundService.playList);
            this.soundService.emptyPlayList();
        }
    };
    GameServer.prototype.getApp = function () {
        return this.app;
    };
    GameServer.PORT = 8080;
    return GameServer;
}());
exports.GameServer = GameServer;

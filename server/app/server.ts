import { AnimationService } from './services/animation-service';
import { SoundService } from './services/sound.service';
import { GameService } from './services/game.service';
import { createServer, Server } from 'http';
import express = require('express');
import socketIo = require('socket.io');
import { TIMEOUT } from 'dns';

export class GameServer {

    gameService: GameService;
    soundService: SoundService;
    animationService: AnimationService;

    static PORT:number = 8080;
    app: express.Application;
    server: Server;
    io: SocketIO.Server;
    port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || GameServer.PORT;
        this.server = createServer(this.app);
        this.io = socketIo(this.server);
        this.soundService = new SoundService();
        this.animationService = new AnimationService();
        this.gameService = new GameService(this.soundService, this.animationService);
        this.listen();
    }

    listen(): void {

        this.app.get('/gamestate', (req, res) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.send(this.gameService.gameState);
        });

        this.app.get('/newGame', (req, res) => {
            this.gameService.gameState = this.gameService.createNewGame();
            res.send("new Game started");
        });

        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            socket.on('clientJoined', (m: string) => {
                console.log(`A client has joined to the Server:${m}`)
                this.io.emit('clientJoined', "A client has joined");
                this.io.emit('changeInGameState', "A change has happened in the gameState");
            });

            socket.on('playCard', (data: any) => {
                console.log("A playCard request came from a client");
                if(!this.gameService.isCardPlayAbleFromHand(data.playedCard)){
                        this.io.emit('warningMessage', "you cant play that Card")
                    return;
                }
                this.gameService.PlayFromHand(data.playedCard);
                this.io.emit('changeInGameState', "A change has happened in the gameState");
                console.log("playing Card...")
                this.sendSoundPlayList();
                this.sendAnimationList();
            });

            socket.on('attackCard', (data: any) => {
                console.log("An attackPlayer request came from a client");
                if(!this.gameService.isCardAbleToAttackEnemyCard(data.attackerCard, data.defenderCard)){
                    console.log("Invalid attackPlayer request");
                    this.io.emit('warningMessage', "you cant attack that Card")
                    return;
                }
                this.animationService.addToAnimationList(data.attackerCard, "attackCard")
                this.sendSoundPlayList();
                this.sendAnimationList();
                // Waiting for the animations for finish before removing dead cards
                setTimeout(() => {
                    this.gameService.attackCard(data.attackerCard, data.defenderCard);
                    this.io.emit('changeInGameState', "A change has happened in the gameState");
                    this.sendAnimationList();
                    console.log("Attacking Card...")
                }, 1000)
            });

            socket.on('attackPlayer', (data: any) => {
                console.log("An attackPlayer request came from a client");
                if(!this.gameService.isCardAbleToAttackEnemyPlayer(data.attackerCard)){
                    console.log("The attackPlayer request was invalid");
                    this.io.emit('warningMessage', "you cant attack the Hero")
                    return;
                }
                // Waiting for the animations for finish before removing dead cards
                this.animationService.addToAnimationList(data.attackerCard, "attackPlayer")
                this.sendSoundPlayList();
                this.sendAnimationList();
                setTimeout(() => {
                    this.gameService.attackEnemyPlayer(data.attackerCard);
                    this.sendAnimationList();
                    this.io.emit('changeInGameState', "A change has happened in the gameState");
                }, 1000)
            });

            socket.on('endRound', (data:any) => {
                console.log("An endRound request came from a client");
                this.gameService.endRound();
                console.log("Ending round...");
                this.sendAnimationList();
                this.io.emit('changeInGameState', "A change has happened in the gameState");
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public sendSoundPlayList(){
        if(!this.soundService.isPlayListEmpty()){
            this.io.emit('changeInPlayList', this.soundService.playList)
            this.soundService.emptyPlayList();
        }
    }

    public sendAnimationList(){
        if(!this.animationService.isAnimationListEmpty()){
            this.io.emit('changeInAnimationList', this.animationService.animationList)
            this.animationService.emptyAnimationList();
        }
    }

    public getApp(): express.Application {
        return this.app;
    }

}
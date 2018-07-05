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
            this.gameService.createNewGame();
            this.io.emit('changeInGameState', "A change has happened in the gameState");
            this.sendAnimationList();
            res.send("new Game started");
        });

        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            socket.on('clientJoined', (m: string) => {
                this.io.emit('clientJoined', "A client has joined");
                this.io.emit('changeInGameState', "A change has happened in the gameState");
                this.checkForGameOver()
            });

            socket.on('playCard', (data: any) => {
                if(!this.gameService.isCardPlayAbleFromHand(data.playedCard)){
                        this.io.emit('warningMessage', "you cant play that Card")
                    return;
                }
                this.gameService.PlayFromHand(data.playedCard);
                this.io.emit('changeInGameState', "A change has happened in the gameState");
                this.sendSoundPlayList();
                this.sendAnimationList();
                this.checkForGameOver()
            });

            socket.on('attackCard', (data: any) => {
                if(!this.gameService.isCardAbleToAttackEnemyCard(data.attackerCard, data.defenderCard)){
                    this.io.emit('warningMessage', "you cant attack that Card")
                    return;
                }
                this.animationService.addCardToAnimationList(data.attackerCard, "attackCard")
                this.sendAnimationList();
                setTimeout(() => {
                    this.gameService.attackCard(data.attackerCard, data.defenderCard);
                    this.io.emit('changeInGameState', "A change has happened in the gameState");
                    this.sendAnimationList();
                    this.sendSoundPlayList();
                    this.checkForGameOver()
                }, 500)
            });

            socket.on('attackPlayer', (data: any) => {
                if(!this.gameService.isCardAbleToAttackEnemyPlayer(data.attackerCard)){
                    this.io.emit('warningMessage', "you cant attack the Hero")
                    return;
                }
                this.animationService.addCardToAnimationList(data.attackerCard, "attackPlayer")
                this.sendAnimationList();
                //Need time for the attack animation to trigger, before dissapearing in the event of death
                setTimeout(() => {
                    this.gameService.attackEnemyPlayer(data.attackerCard);
                    this.sendSoundPlayList();
                    this.sendAnimationList();
                    this.io.emit('changeInGameState', "A change has happened in the gameState");
                    this.checkForGameOver()
                }, 500)
            });

            socket.on('endRound', (data:any) => {
                this.gameService.endRound();
                this.sendAnimationList();
                this.io.emit('changeInGameState', "A change has happened in the gameState");
                this.checkForGameOver()
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

    public checkForGameOver() {
        if(this.gameService.isGameOver()){
            this.io.emit('warningMessage', 'The game is over')
        }
    }

}
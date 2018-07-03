import { SocketService } from './service/SocketService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { PlayerTwoComponent } from './player-two/player-two.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path:"playerone", component: GameComponent},
  {path:"playertwo", component: PlayerTwoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    PlayerTwoComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

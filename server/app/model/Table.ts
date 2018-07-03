import { Hand } from "./Hand";
import { Card } from "./cards/Card";
import { Half } from "./Half";

export class Table {

  enemyHalf: Half;
  myHalf: Half;


  constructor(myHalf: Half, enemyHalf: Half) {
    this.enemyHalf = enemyHalf;
    this.myHalf = myHalf;
  }
}

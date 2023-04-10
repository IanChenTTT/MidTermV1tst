const { resolve } = require("path");
const GameBoard = require("../Util/GameBoard.js");
class EachGame extends GameBoard {
  #gameHistory;
  #gameHistoryArr;
  //   -1 Mean white turn
  #PlayerTurn = -1;
  #Player1State;
  #Player2State;
  constructor() {
    super();
    this.#gameHistory = this.getChess_Board;
  }
  //   conssider extreme case (0,0) (7,7) (0,7) (7,0)
  Rooksmove(y, x) {
    return new Promise((resolve, reject) => {
      let Arr = [];
      let isBlock = false;
      let isBlock1 = false;
      let isBlock2 = false;
      let isBlock3 = false;
      // Check one side each time
      for (let x1 = x + 1; x1 < 8; x1++) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#gameHistory[y][x1]);

          tempArr.push(a.toString());
          if (tempArr[0] !== "" && isBlock === false) isBlock = true;
          else if (isBlock === false) Arr.push(`${y}_${x1}`);
        }, 0);
      }
      for (let x2 = x - 1; x2 >= 0; x2--) {
        let tempArr = [];

        // offload
        setTimeout(() => {
          let a = Object.values(this.#gameHistory[y][x2]);
          tempArr.push(a.toString());
          if (tempArr[0] !== "" && isBlock1 === false) isBlock1 = true;
          else if (isBlock1 === false) Arr.push(`${y}_${x2}`);
        }, 0);
      }
      for (let y1 = y + 1, counter = 0; y1 < 8; y1++) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          console.log("y1");
          let a = Object.values(this.#gameHistory[y1][x]);
          tempArr.push(a.toString());
          if (tempArr[0] !== "" && isBlock2 === false) isBlock2 = true;
          else if (isBlock2 === false) Arr.push(`${y1}_${x}`);
        }, 0);
      }
      for (let y2 = y - 1, counter = 0; y2 >= 0; y2--) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#gameHistory[y2][x]);
          tempArr.push(a.toString());
          if (tempArr[0] !== "" && isBlock3 === false) isBlock3 = true;
          else if (isBlock3 === false) Arr.push(`${y2}_${x}`);
        }, 0);
      }
      //   Queing microtask inorder send data
      setTimeout(() => {
        resolve(Arr);
      }, 0);
    });
  }
  Kinghtmove(y,x){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(Arr);
        },0);
    })
  }
  //   spread syntax!!!
  // array compare easily for json.strintify or toString()
  async getTarget(...target) {
    let y = parseInt(target[0]);
    let x = parseInt(target[1]);
    let current = this.#gameHistory[y][x];
    switch (Object.values(current).toString()) {
      case "R":
        return await this.Rooksmove(y, x);
      case "N":
        return await this.Knightmove(y, x);
      case "B":
        Bishopmove(y, x);
      case "Q":
        Queenmove(y, x);
      case "K":
        Kingmove(y, x);
      case "P":
        Pawnmove(y, x);
    }
  }
  get getGameHistory() {
    return this.#gameHistory;
  }
  getSearchHistory(y, x) {
    return this.#gameHistory[y][x];
  }
}
let test = new EachGame();
test.Rooksmove(4, 4).then((resolve) => {
  console.table(resolve);
});
module.exports = EachGame;

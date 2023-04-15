const { resolve } = require("path");
const GameBoard = require("../Util/GameBoard.js");
const DoubleLinkList = require("../Ds/Linklist.js")
class EachGame extends GameBoard {
  #CurrentGameBoard;
  #gameHistoryArr;
  //   -1 Mean white turn
  #PlayerTurn = -1;
  #Player1State;
  #PlayerTarget = [];
  #Player2State;
  #PlayerMoveHistory = new DoubleLinkList();
  constructor() {
    super();
    this.#CurrentGameBoard = this.getChess_Board;
  }
  get getGameHistory() {
    return this.#CurrentGameBoard;
  }
  getSearchHistory(y, x) {
    return this.#CurrentGameBoard[y][x];
  }
  get Target() {
    return this.#PlayerTarget;
  }
  set #Target(arg) {
    this.#PlayerTarget = arg;
  }
  //   conssider extreme case (0,0) (7,7) (0,7) (7,0)
  #Rooksmove(y, x) {
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
          let a = Object.values(this.#CurrentGameBoard[y][x1]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock === false) isBlock = true;
          else if (isBlock === false) Arr.push(`${y}_${x1}`);
        }, 0);
      }
      for (let x2 = x - 1; x2 >= 0; x2--) {
        let tempArr = [];

        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y][x2]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock1 === false) isBlock1 = true;
          else if (isBlock1 === false) Arr.push(`${y}_${x2}`);
        }, 0);
      }
      for (let y1 = y + 1, counter = 0; y1 < 8; y1++) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y1][x]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock2 === false) isBlock2 = true;
          else if (isBlock2 === false) Arr.push(`${y1}_${x}`);
        }, 0);
      }
      for (let y2 = y - 1, counter = 0; y2 >= 0; y2--) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y2][x]);
          tempArr.push(a[0].toString());
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
  #Knightmove(y, x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log(this.#gameHistory[y-10][x-10]);
        let test = [];
        y - 2 >= 0 && x - 1 >= 0 ? test.push(`${y - 2}_${x - 1}`) : null;
        y - 1 >= 0 && x - 2 >= 0 ? test.push(`${y - 1}_${x - 2}`) : null;
        y + 1 < 8 && x - 2 >= 0 ? test.push(`${y + 1}_${x - 2}`) : null;
        y + 2 < 8 && x - 1 >= 0 ? test.push(`${y + 2}_${x - 1}`) : null;
        y + 2 < 8 && x + 1 < 8 ? test.push(`${y + 2}_${x + 1}`) : null;
        y + 1 < 8 && x + 2 < 8 ? test.push(`${y + 1}_${x + 2}`) : null;
        y - 1 >= 0 && x + 2 < 8 ? test.push(`${y - 1}_${x + 2}`) : null;
        y - 2 >= 0 && x + 1 < 8 ? test.push(`${y - 2}_${x + 1}`) : null;
        resolve(test);
      }, 0);
    });
  }
  #Bishopmove(y, x) {
    return new Promise((resolve, reject) => {
      let Arr = [];
      let isBlock = false;
      let isBlock1 = false;
      let isBlock2 = false;
      let isBlock3 = false;
      // Check one side each time
      for (let x1 = x + 1, y1 = y + 1; x1 < 8 && y1 < 8; x1++, y1++) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y1][x1]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock === false) isBlock = true;
          else if (isBlock === false) Arr.push(`${y2}_${x1}`);
        }, 0);
      }
      for (let x2 = x - 1, y2 = y + 1; x2 >= 0 && y2 < 8; x2--, y2++) {
        let tempArr = [];

        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y2][x2]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock1 === false) isBlock1 = true;
          else if (isBlock1 === false) Arr.push(`${y2}_${x2}`);
        }, 0);
      }
      for (let y3 = y - 1, x3 = x - 1; y3 >= 0 && x3 >= 0; y3--, x3--) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y3][x3]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock2 === false) isBlock2 = true;
          else if (isBlock2 === false) Arr.push(`${y3}_${x3}`);
        }, 0);
      }
      for (let y4 = y - 1, x4 = x + 1; y4 >= 0 && x4 < 8; y4--, x4++) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y4][x4]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock3 === false) isBlock3 = true;
          else if (isBlock3 === false) Arr.push(`${y4}_${x4}`);
        }, 0);
      }
      //   Queing microtask inorder send data
      setTimeout(() => {
        resolve(Arr);
      }, 0);
    });
  }
  async #Queenmove(y, x) {
    return new Promise(async (resolve) => {
      let temp = [];
      temp.push(await this.#Bishopmove(y, x));
      temp.push(await this.#Rooksmove(y, x));
      resolve(temp);
    });
  }
  #Kingmove(y, x) {
    return new Promise((resolve) => {
      let temp = [];
      for (let y1 = y - 1; y1 <= y + 1; y1++) {
        for (let x2 = x - 1; x2 <= x + 1; x2++) {
          setTimeout(() => {
            if (x2 >= 0 && x2 < 8 && y1 < 8 && y1 >= 0) {
              if (Object.values(this.#CurrentGameBoard[y1][x2]) === "")
                temp.push(`${y1}_${x1}`);
            }
          }, 0);
        }
      }
      setTimeout(() => {
        resolve(temp);
      }, 0);
    });
  }
  #Pawnmove(y, x) {
    return new Promise((resolve) => {
      if (y + 2 < 8) {
        resolve(this.#CurrentGameBoard[y + 2][x]);
      }
    });
  }
  //   spread syntax!!!
  // array compare easily for json.strintify or toString()
  async getTarget(...target) {
    let y = parseInt(target[0]);
    let x = parseInt(target[1]);
    let current = this.#CurrentGameBoard[y][x];
    let a = Object.values(current);
    let holder = [];
    // Object values return array [['R','W']]
    switch (a[0][0].toString()) {
      case "R":
        holder = await this.#Rooksmove(y, x);
        break;
      case "N":
        holder = await this.#Knightmove(y, x);
        break;
      case "B":
        holder = await this.#Bishopmove(y, x);
        break;
      case "Q":
        holder = await this.#Queenmove(y, x);
        break;
      case "K":
        holder = await this.#Kingmove(y, x);
        break;
      case "P":
        holder = await this.#Pawnmove(y, x);
        break;
    }
    this.#PlayerTarget = holder;
    return holder;
  }
}
let test = new EachGame();
console.table(test.getGameHistory);
console.table(test.getChess_Color);
module.exports = EachGame;

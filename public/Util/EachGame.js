const { resolve } = require("path");
const GameBoard = require("../Util/GameBoard.js");
const DoubleLinkList = require("../Ds/Linklist.js");
class EachGame extends GameBoard {
  #CurrentGameBoard;
  #gameHistoryArr;
  //   -1 Mean white turn
  #PlayerTurn = -1;
  #Player1Color = "";
  #Player2Color = "";
  #PlayerColorBoard = null;
  #PlayerTarget = [];
  #Player2Target = [];
  #KingLocate = null;
  #PlayerMoveHistory = new DoubleLinkList();
  constructor(Iswhite) {
    super();
    this.#CurrentGameBoard = this.getChess_Board;
    if (Iswhite) {
      this.#Player1Color = "W";
      this.#PlayerColorBoard = [
        ["B", "B", "B", "B", "B", "B", "B", "B"],
        ["B", "B", "B", "B", "B", "B", "B", "B"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["W", "W", "W", "W", "W", "W", "W", "W"],
      ];
      this.#Player2Color = "B";
    } else {
      this.#Player1Color = "B";
      this.#PlayerColorBoard = [
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["W", "W", "W", "W", "W", "W", "W", "W"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["B", "B", "B", "B", "B", "B", "B", "B"],
        ["B", "B", "B", "B", "B", "B", "B", "B"],
      ];
      this.#Player2Color = "W";
    }
  }
  getUserColor2D() {
    return this.#PlayerColorBoard;
  }
  getUserColor() {
    return this.#Player1Color;
  }

  getBordColor(y, x) {
    console.log(y, x);
    return this.#PlayerColorBoard[y][x];
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
  get OpponentTar() {
    return this.#Player2Target;
  }
  setCurrentHistory(y, x, y1, x2) {
    let first = Object.entries(this.#CurrentGameBoard[y][x]);
    let second = Object.entries(this.#CurrentGameBoard[y1][x2]);
    let temp = first[0][0];
    let temp1 = second[0][0];
    console.log(this.#CurrentGameBoard[y][x][temp], "Settting Board");
    this.#CurrentGameBoard[y1][x2][temp1] = this.#CurrentGameBoard[y][x][temp];
    this.#CurrentGameBoard[y][x][temp] = "";
    // Object.values(this.#CurrentGameBoard[y][x])="";
  }
  setBoardColor(y, x, y1, x2) {
    this.#PlayerColorBoard[y1][x2] = this.#PlayerColorBoard[y][x];
    this.#PlayerColorBoard[y][x] = "";
  }
  set #Target(arg) {
    this.#PlayerTarget = arg;
  }
  /**
   * @param {{ X: unsign int; Y: unign int; }} target
   */
  set Kinglocation(target) {
    console.log(target);
    if (this.#Player1Color == "W") {
      this.#KingLocate.WhiteX = target.X;
      this.#KingLocate.WhiteY = target.Y;
    }
    if (this.#Player1Color == "B") {
      this.#KingLocate.BlackX = target.X;
      this.#KingLocate.BlackY = target.Y;
    }
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
          if (tempArr[0] !== "" && isBlock === false) {
            isBlock = true;
            if (tempArr[0] === this.#Player2Color) Arr.push(`${y}_${x1}`);
          } else if (isBlock === false) Arr.push(`${y}_${x1}`);
        }, 0);
      }
      for (let x2 = x - 1; x2 >= 0; x2--) {
        let tempArr = [];

        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y][x2]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock1 === false) {
            isBlock1 = true;
            if (tempArr[0] === this.#Player2Color) Arr.push(`${y}_${x2}`);
          } else if (isBlock1 === false) Arr.push(`${y}_${x2}`);
        }, 0);
      }
      for (let y1 = y + 1, counter = 0; y1 < 8; y1++) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y1][x]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock2 === false) {
            isBlock2 = true;
            if (tempArr[0] === this.#Player2Color) Arr.push(`${y1}_${x}`);
          } else if (isBlock2 === false) Arr.push(`${y1}_${x}`);
        }, 0);
      }
      for (let y2 = y - 1, counter = 0; y2 >= 0; y2--) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y2][x]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock3 === false) {
            isBlock3 = true;
            if (tempArr[0] === this.#Player2Color) Arr.push(`${y1}_${x}`);
          } else if (isBlock3 === false) Arr.push(`${y2}_${x}`);
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
          if (tempArr[0] !== "" && isBlock === false) {
            isBlock = true;
            if (tempArr[0] === this.#Player2Color) Arr.push(`${y2}_${x1}`);
          } else if (isBlock === false) Arr.push(`${y2}_${x1}`);
        }, 0);
      }
      for (let x2 = x - 1, y2 = y + 1; x2 >= 0 && y2 < 8; x2--, y2++) {
        let tempArr = [];

        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y2][x2]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock1 === false) {
            isBlock1 = true;
            if (tempArr[0] === this.#Player2Color) Arr.push(`${y2}_${x2}`);
          } else if (isBlock1 === false) Arr.push(`${y2}_${x2}`);
        }, 0);
      }
      for (let y3 = y - 1, x3 = x - 1; y3 >= 0 && x3 >= 0; y3--, x3--) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y3][x3]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock2 === false) {
            isBlock2 = true;
            if (tempArr[0] === this.#Player2Color) Arr.push(`${y3}_${x3}`);
          } else if (isBlock2 === false) Arr.push(`${y3}_${x3}`);
        }, 0);
      }
      for (let y4 = y - 1, x4 = x + 1; y4 >= 0 && x4 < 8; y4--, x4++) {
        let tempArr = [];
        // offload
        setTimeout(() => {
          let a = Object.values(this.#CurrentGameBoard[y4][x4]);
          tempArr.push(a[0].toString());
          if (tempArr[0] !== "" && isBlock3 === false) {
            isBlock3 = true;
            if (tempArr[0] === this.#Player2Color) Arr.push(`${y4}_${x4}`);
          } else if (isBlock3 === false) Arr.push(`${y4}_${x4}`);
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
      let temp2 = await this.#Bishopmove(y, x);
      temp = temp2.concat(await this.#Rooksmove(y, x));
      resolve(temp);
    });
  }
  #Kingmove(y, x) {
    return new Promise((resolve) => {
      let test = [];
      // y-1 x-1
      y - 1 >= 0 && x - 1 >= 0 ? test.push(`${y - 1}_${x - 1}`) : null;
      y - 1 >= 0 ? test.push(`${y - 1}_${x}`) : null;
      y - 1 >= 0 && x + 1 < 8 ? test.push(`${y - 1}_${x + 1}`) : null;
      x - 1 >= 0 ? test.push(`${y}_${x - 1}`) : null;
      x + 1 < 8 ? test.push(`${y}_${x + 1}`) : null;
      y + 1 < 8 && x - 1 >= 0 ? test.push(`${y + 1}_${x - 1}`) : null;
      y + 1 < 8 ? test.push(`${y + 1}_${x}`) : null;
      y + 1 < 8 && x + 1 < 8 ? test.push(`${y + 1}_${x + 1}`) : null;
      resolve(test);
      setTimeout(() => {
        resolve(temp);
      }, 0);
    });
  }
  #Pawnmove(y, x) {
    return new Promise((resolve) => {
      let test = [];

      if (y - 1 < 8) test.push(`${y - 1}_${x}`);
      if (y - 2 < 8) test.push(`${y - 2}_${x}`);
      console.log(test);
      resolve(test);
    });
  }
  //   spread syntax!!!
  // array compare easily for json.strintify or toString()
  async getTarget(...target) {
    let y = target[0];
    let x = target[1];
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
    // ex: [ '5_0', '6_3', '5_2' ] string[0] string [2]
    let holder2 = [];
    let holder3 = [];
    holder.forEach((value) => {
      let Player2y = 7 - value[0];
      let Player2x = 7 - value[2];
      let player2 = `${Player2y}_${Player2x}`;
      if (this.#PlayerColorBoard[value[0]][value[2]] !== this.#Player1Color) {
        holder2.push(value);
        holder3.push(player2);
      }
    });
    this.#PlayerTarget = holder2;
    this.#Player2Target = holder3;
    return holder2;
  }
}
let test = new EachGame();
console.table(test.getGameHistory);
console.table(test.getChess_Color);
module.exports = EachGame;

const ChessPiece = require("../Util/BoardPiece.js");
class GameBoard extends ChessPiece {
  #Board_init;
  constructor() {
    super();
    const Verticle = [8, 7, 6, 5, 4, 3, 2, 1];
    const Horizontle = ["a", "b", "c", "d", "e", "f", "g", "h"];
    this.Board_2D = () => {
      return this.CreateBoardArr2D(Verticle, Horizontle);
    };
    this.Board_2Dobj = this.Board_2D().map((row) => {
      return row.map(function(cell){
        return { [`${cell}`]: '' };
      });
    });
    this.#Board_init = this.getBoard_2Dobj;
    this.Initboard();
  }
  //   This encapsulate the member only
  //   getter in the class only class
  //   can modify chess board
  get getBoard_2Dobj() {
    return this.Board_2Dobj;
  }
  get getBoard_2D() {
    return this.Board_2D;
  }
  ShowBoardID() {
    console.table(this.Board_2D);
  }
  CreateBoardArr2D(arg1, arg2) {
    let TempArr = [];
    for (let y = 0; y < 8; y++) {
      TempArr[y] = [];
      for (let x = 0; x < 8; x++) {
        TempArr[y][x] = `${arg2[x]}${arg1[y]}`;
      }
    }
    return TempArr;
  }
   Initboard(){
    this.#Board_init[0][0].a8 = ['R'];
    this.#Board_init[0][1].b8 = ['N'];
    this.#Board_init[0][2].c8 = ['B'];
    this.#Board_init[0][3].d8 = ['Q'];
    this.#Board_init[0][4].e8 = ['K'];
    this.#Board_init[0][5].f8 = ['B'];
    this.#Board_init[0][6].g8 = ['N'];
    this.#Board_init[0][7].h8 = ['R'];
    this.#Board_init[7][0].a1 = ['R'];
    this.#Board_init[7][1].b1 = ['N'];
    this.#Board_init[7][2].c1 = ['B'];
    this.#Board_init[7][3].d1 = ['Q'];
    this.#Board_init[7][4].e1 = ['K'];
    this.#Board_init[7][5].f1 = ['B'];
    this.#Board_init[7][6].g1 = ['N'];
    this.#Board_init[7][7].h1 = ['R'];
    this.#Board_init[1][0].a7 = ['P'];
    this.#Board_init[1][1].b7 = ['P'];
    this.#Board_init[1][2].c7 = ['P'];
    this.#Board_init[1][3].d7 = ['P'];
    this.#Board_init[1][4].e7 = ['P'];
    this.#Board_init[1][5].f7 = ['P'];
    this.#Board_init[1][6].g7 = ['P'];
    this.#Board_init[1][7].h7 = ['P'];
    this.#Board_init[6][0].a2 = ['P'];
    this.#Board_init[6][1].b2 = ['P'];
    this.#Board_init[6][2].c2 = ['P'];
    this.#Board_init[6][3].d2 = ['P'];
    this.#Board_init[6][4].e2 = ['P'];
    this.#Board_init[6][5].f2 = ['P'];
    this.#Board_init[6][6].g2 = ['P'];
    this.#Board_init[6][7].h2 = ['P'];
  }
  get getChess_Board() {
    return this.#Board_init;
  }
}
let test = new GameBoard();
console.table(test.Board_2D());
module.exports = GameBoard;
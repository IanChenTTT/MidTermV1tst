const GameBoard = require("../Util/GameBoard.js")
class EachGame extends GameBoard {
  #gameHistory
  #gameHistoryArr
//   -1 Mean white turn
  #PlayerTurn = -1;
  #Player1State;
  #Player2State;
  constructor() {
    super();
    this.#gameHistory = this.getChess_Board;
  }
  getTarget(target){

  }
  get getGameHistory(){
    return this.#gameHistory;
  }
   
 
}
module.exports = EachGame;
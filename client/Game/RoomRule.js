//DOM api use Drop and Drag
// import { socket } from "./ChessRoom.cjs";
//NO!!!! MODIFY CLASS!!!!!!!!!!!!
const Eachgame = require('../../public/Util/EachGame')
let Test = new Eachgame();
console.table(Test.getChess_Board);
const item = document.querySelectorAll('.CanDrag');
item.forEach(element => {
  element.addEventListener("dragstart", ()=>{
  console.log(element.className[0]+" "+element.className[2]);

  });
});
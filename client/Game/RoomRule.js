//DOM api use Drop and Drag
// import { socket } from "./ChessRoom.cjs";
//NO!!!! MODIFY CLASS!!!!!!!!!!!!
const EachGame = require("../../public/Util/EachGame.js")
let Test = new Eachgame();
console.table(Test.getChess_Board);
const item = document.querySelectorAll('.CanDrag');
item.forEach(element => {
  element.addEventListener("dragstart", ()=>{
  console.log(element.className[0]+" "+element.className[2]);
  Test.getTarget(element.className[0]+" "+element.className[2]);  
  });
});
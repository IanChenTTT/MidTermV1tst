let image = [
  0, 1, 2, 3, 4, 5, 3, 2, 1, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10,
  10, 10, 10, 10, 10, 10, 11, 12, 13, 14, 15, 13, 12, 11,
];
//Chess element start at 1 offset is +1
// 1: Rook 2:Knight 3:Bishop 4: Queen 5:king 6 Pawn => Black
// 10: Pawn 11:Rook 12:Knight 13:Bishop 14: Queen 15: King => white

// create element only create once hence you need throw into for!!!!
// Set Back as board color and Font is Chess piece each is individual div!!

//----------Back
let JSel1 = document.querySelector("#Back");
for (let i = 1, count = 1; i <= 64; i++) {
  let TWblock = document.createElement("div");
  TWblock.classList.add("WhiteBlocks");
  let TBblock = document.createElement("div");
  TBblock.classList.add("ColorBlock");
  if (count > 16) count = 1;
  if (count <= 8) {
    if (i % 2 == 0) JSel1.appendChild(TBblock);
    else JSel1.appendChild(TWblock);
    count++;
  } else if (count > 8) {
    if (i % 2 == 0) JSel1.appendChild(TWblock);
    else JSel1.appendChild(TBblock);
    count++;
  }
}
//----------Front
//60 div with drop id class
//Chess piece id is image id
//Chess Move detect by Move class

let JSel2 = document.querySelector("#Front");
for (let i = 1; i <= 64; i++) {
  let ChessJ = document.createElement(`div`);
   ChessJ.classList.add(`Drop`,`${i}`);
  if (image[i] === 0) {
    JSel2.appendChild(ChessJ);
    continue;
  }
  ChessJ.classList.add(`ChessPiece${image[i]}`, `Move`);
  // Set Attribute !!!!!
  ChessJ.setAttribute("draggable", "true");
  JSel2.appendChild(ChessJ);
  //  let temp = "url(img/" + image[i] + ".png)"; Change teplate litrual
  ChessJ.style.backgroundImage = `url(img/${image[i]}.png`;
}

//Chess element start at 1 offset is +1
// 1: Rook 2:Knight 3:Bishop 4: Queen 5:king 6 Pawn => Black
// 10: Pawn 11:Rook 12:Knight 13:Bishop 14: Queen 15: King => white

// create element only create once hence you need throw into for!!!!
// Set Back as board color and Font is Chess piece each is individual div!!

const image = PlayerSwitcher(true);
//----------Back
let JSel1 = document.querySelector("#Back");
let SwapBlock = -1;
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++, SwapBlock *= -1) {
    let block = document.createElement("div");
    SwapBlock === -1
      ? block.classList.add("ColorBlock")
      : block.classList.add("WhiteBlocks");
    JSel1.append(block);
  }
  SwapBlock *= -1;
}

//----------Front
//60 div with drop id class
//Chess piece id is image id
//Chess Move detect by Move class

let JSel3 = document.querySelector("#Front");
for (let y = 0; y < 2; y++) {
  for (let x = 0; x < 8; x++) 
  {
    let ChessJ = document.createElement(`div`);
    ChessJ.classList.add(`${y}_${x}`, `ChessPiece`,'CanDrag','dropable');
    ChessJ.setAttribute("draggable","true");
    ChessJ.style.backgroundImage = `url(./image/${image[y][x]}.svg)`;
  
    JSel3.appendChild(ChessJ)
  }
}
for (let y = 2; y < 6; y++) {
  for (let x = 0; x < 8; x++) 
  {
    let ChessJ = document.createElement(`div`);
    ChessJ.classList.add(`${y}_${x}`,'dropable');
    JSel3.appendChild(ChessJ)
  }
}

for (let y = 2, y1=6; y < 4 ,y1<8; y++,y1++) {
  for (let x = 0; x < 8; x++) 
  {
    let ChessJ = document.createElement(`div`);
    ChessJ.classList.add(`${y1}_${x}`, `ChessPiece`,'CanDrag','dropable');
    ChessJ.setAttribute("draggable","true");
    ChessJ.style.backgroundImage = `url(./image/${image[y][x]}.svg)`;
    JSel3.appendChild(ChessJ)
  }
}
function PlayerSwitcher(Yes){
  if(Yes)
  {
  return  (
    [
  [`BR`, `BN`, `BB`, `BQ`, `BK`, `BB`, `BN`, `BR`],
  [`BP`, `BP`, `BP`, `BP`, `BP`, `BP`, `BP`, `BP`],
  [`WP`, `WP`, `WP`, `WP`, `WP`, `WP`, `WP`, `WP`],
  [`WR`, `WN`, `WB`, `WQ`, `WK`, `WB`, `WN`, `WR`]
] 
  ) ;
  }
  else
  {
  return   (
    [
  [`WP`, `WP`, `WP`, `WP`, `WP`, `WP`, `WP`, `WP`],
  [`WR`, `WN`, `WB`, `WQ`, `WK`, `WB`, `WN`, `WR`],
  [`BP`, `BP`, `BP`, `BP`, `BP`, `BP`, `BP`, `BP`],
  [`BR`, `BN`, `BB`, `BQ`, `BK`, `BB`, `BN`, `BR`],
]
  );
  }
}


let front = document.querySelector("#front")
let back = document.querySelector("#back")
for(let y =0 ; y<8 ; y++)
{
    
    for(let x=0; x<8 ; x++)
        {
          const board = document.createElement("div")  
          x % 2 === 0  ? 
          board.setAttribute("id","blackB")
          :
          board.setAttribute("id","whiteB")
          front.append(board);
        }
}
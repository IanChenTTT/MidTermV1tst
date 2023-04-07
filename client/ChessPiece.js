//DOM api use Drop and Drag
//NO!!!! MODIFY CLASS!!!!!!!!!!!!
let dragged;
let dropped;
let Mov = document.querySelectorAll(".Move");
let Target = document.querySelectorAll(".Drop")
console.log(Mov)
//Mov is NodeList so for each node of Move
Mov.forEach(el=>{
 el.addEventListener("dragstart",MovStart) 
 el.addEventListener("dragend",MovEnd) 

});
Target.forEach(el=>{
  el.addEventListener("dragover",TarDrag,false)
  el.addEventListener("dragenter",TarEnter)
  el.addEventListener("dragLeave",TarLeave)
  el.addEventListener("drop",TarDrop)
})
function MovStart(event){
  dragged = event.target;
  event.dataTransfer.setData('text/plain', event.target.id)
}
function MovEnd(event){
  event.target.style.opacity=1; 
}
function TarDrag(event){
  event.preventDefault();
}
function TarEnter(event){
  if(event.target.classList.contains("Drop"))
   console.log("TarEnter");
}
function TarLeave(event){
 if(event.target.classList.contains("Drop"))
   console.log("TarLeave");
}
function TarDrop(event){
  event.preventDefault()
  let id = event.dataTransfer.getData('text/plain');
 // console.log(id);
 // console.log(event.target)
//  console.log(dragged);
const tst = dragged.className;
console.log(tst.includes("Move"));
 dropped = event.target;
 if(!dropped.className.includes("Move"))
  { 
    dropped.className += " Move"
    dropped.setAttribute("draggable","true");
  }
  let a = dragged.style.backgroundImage;
  dragged.style.removeProperty("background-Image");
  dropped.style.backgroundImage=a;
}
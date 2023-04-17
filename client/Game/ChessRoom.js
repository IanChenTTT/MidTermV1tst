const socket = io();
const item = document.querySelectorAll(".CanDrag");
// Get the URL qquery string
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const thisUsername = params.username;
const thisRoom = params.room;
// -------------------------
// Join room
console.log(thisRoom);
socket.emit("joinRoom",thisUsername,thisRoom);
item.forEach((element) => 
{
  element.addEventListener("dragstart", function (event) {
    dragStart(event, this);
  });
  // To allow drop
  element.addEventListener("dragend", function (event) {
    console.log("drag end")
    dragEnd(event, this);
  });
  element.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
});
socket.on("Gettarget", (target) => {
  console.table(target);
  if (target[0] !== "") {
    console.log(document.getElementsByClassName(target[0]));
    target.forEach((element) => {
      let hold = document.getElementsByClassName(element);
      hold[0].classList.add("MoveAble");
    });
  }
});
 socket.on("ReturnTarget", (target) => 
  {
    console.log(target,"Returnning target");
    if (target[0] !== "") 
    {
      target.forEach((element) => 
      {
        let hold = document.getElementsByClassName(element);
        hold[0].classList.remove("MoveAble");
      });
    }
  });
  socket.on("UserEnterMSG",(arg)=>{
    console.log(arg);
  })
 
// IMPORTANT SET SOCKET ON OUTSIDE EVENT LISNTER!!!!!!!
async function dragStart(event, element) {
  event.dataTransfer.setData("Text", event.target.id);
  console.log(element.className[0] + " " + element.className[2]);
  // -------------
  await socket.emit(
    "ChessCORD",
    element.className[0],
    element.className[2],
    (arg) => {
      console.log(arg);
    }
  );
  console.log("drag start");
}
 function dragEnd(event, element) {
  console.log("enter drag end")
  socket.emit("dragEnd", "drag has end");
 
}

const socket = io();
// Get the URL qquery string
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const thisUsername = params.username;
const thisRoom = params.room;
// -------------------------
// Join room
console.log(thisRoom);
socket.emit("joinRoom", thisUsername, thisRoom);
socket.on("WhiteORBlack", (Switcher) => {
  console.log(SpawnBoard(Switcher));
  const item = document.querySelectorAll(".CanDrag");
  const item2 = document.querySelectorAll(".dropable");
  // console.log(item2);
  item.forEach((element) => {
    AddDragEvent(element);
  });
  item2.forEach((element, key) => {
    element.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    element.addEventListener("dragenter", (event) => {
      event.preventDefault();
    });
    element.addEventListener("drop", (event) => {
      event.preventDefault();
      let target = element.className.split(" ")
      const data = event.dataTransfer.getData("text");
    let origin = data.split(" ");
    console.log(origin[0]);
      socket.emit("dropTarget",target[0],origin[0]);
    });
  });
});
function AddDragEvent(element) {
  element.addEventListener("dragstart", function (event) {
    console.log("dragstart");
    dragStart(event, this);
  });
  // To allow drop
  element.addEventListener("dragend", function (event) {
    console.log("drag end");
    dragEnd(event, this);
  });
}
function RemoveDragEvent(element) {
  element.removeEventListener("dragstart", function (event) {
    console.log("dragstart");
    dragStart(event, this);
  });
  element.removeEventListener("dragend", function (event) {
    console.log("drag end");
    dragEnd(event, this);
  });
}
function dragging (){
  
}
// Fire When dragStart
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
// Fire when dragEnd
socket.on("ReturnTarget", (target) => {
  console.log(target, "Returnning target");
  if (target[0] !== "") {
    target.forEach((element) => {
      let hold = document.getElementsByClassName(element);
      hold[0].classList.remove("MoveAble");
    });
  }
});
// Fire when opponent move is valid
// socket.on("RemoveTarget",...arg =>{
//   arg[0]
// })
// Success drop
socket.on("drop", (target,origin,Pic,Arr) => {
  let Orig = document.getElementsByClassName(origin)
  let Tar = document.getElementsByClassName(target)
  Tar[0].setAttribute("draggable","true");
  RemoveDragEvent(Orig[0]);
  AddDragEvent(Tar[0]);
  Orig[0].style.backgroundImage = `none`;
  Tar[0].style.backgroundImage = `url(../image/${Pic}.svg)`;
  socket.emit("UserBoardChange",Arr);
  console.log(Orig[0],Tar[0]);
});
// Fire when eser Enter
socket.on("UserEnterMSG", (arg) => {
  console.log(arg);
});
socket.on("ResultColor", (IsColor, y, x) => {
  let result = IsColor;
  if (result) {
    console.log("enter chess cord");
    socket.emit("ChessCORD", y, x, (arg) => {
      console.log(arg);
    });
  } else {
    console.log("chess cord");
    return null;
  }
});
// IMPORTANT SET SOCKET ON OUTSIDE EVENT LISNTER!!!!!!!
async function dragStart(event, element) {
  event.dataTransfer.setData("Text", event.target.className);
  const data = event.dataTransfer.getData("text");
  console.log(data);
  console.log(element.className[0] + " " + element.className[2]);
  //  Catch if user drag own color
  socket.emit("JudgeColor", element.className[0], element.className[2]);
  console.log("drag start");
}
function dragEnd(event, element) {
  console.log("enter drag end");
  socket.emit("dragEnd", "drag has end");
}

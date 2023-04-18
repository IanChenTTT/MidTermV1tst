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
  item.forEach((element) => {
    element.addEventListener("dragstart", function (event) {
      console.log("dragstart");
      dragStart(event, this);
    });
    // To allow drop
    element.addEventListener("dragend", function (event) {
      console.log("drag end");
      dragEnd(event, this);
    });
    element.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
  });
});
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
// Fire when eser Enter
socket.on("UserEnterMSG", (arg) => {
  console.log(arg);
});
 socket.on("ResultColor", (IsColor,y,x) => {
    let result = IsColor;
    if (result) {
      console.log("enter chess cord");
      socket.emit("ChessCORD",y,x,
        (arg) => {
          console.log(arg);
        }
      );
    } else {
      console.log("chess cord");
      return null;
    }
  });
// IMPORTANT SET SOCKET ON OUTSIDE EVENT LISNTER!!!!!!!
async function dragStart(event, element) {
  event.dataTransfer.setData("Text", event.target.id);
  console.log(element.className[0] + " " + element.className[2]);
  //  Catch if user drag own color
  socket.emit("JudgeColor", element.className[0], element.className[2]);
  console.log("drag start");
}
function dragEnd(event, element) {
  console.log("enter drag end");
  socket.emit("dragEnd", "drag has end");
}

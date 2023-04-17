const socket = io();
const item = document.querySelectorAll(".CanDrag");
item.forEach((element) => {
  element.addEventListener("dragstart", function (event) {
    dragStart(event, this);
  });
  // To allow drop
  element.addEventListener("dragend", function (event) {
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
    if (target[0] !== "") 
    {
      target.forEach((element) => 
      {
        let hold = document.getElementsByClassName(element);
        hold[0].classList.remove("MoveAble");
      });
    }
  });
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
async function dragEnd(event, element) {
  socket.emit("dragEnd", true);
 
}

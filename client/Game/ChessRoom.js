const socket = io();
// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) }, (res) => {
  console.log(res);
});
const item = document.querySelectorAll(".CanDrag");
item.forEach((element) => {
  console.log(element);
  element.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("Text", event.target.id);
    console.log(element.className[0] + " " + element.className[2]);
    socket.emit("ChessCORD", element.className[0], element.className[2],(arg)=>{
      console.log(arg);
    });
    let holder = [];
    socket.on("Gettarget", (arg) => {
      holder = arg.split(',')
      console.table(holder)
      if(arg !== '')
      {
        console.log(document.getElementsByClassName(`${holder[0]}`));
        holder.forEach(element => {
     let hold = document.getElementsByClassName(element);
        hold[0].classList.add("MoveAble");
        console.log(hold[0]);
        });
        
      }
    });
  });
});
function dragStart() {
  console.log("drag start");
}
// receive a message from the server
socket.on("Hello", (arg) => {
  console.log(arg);
});

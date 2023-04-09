const socket = io()
// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) },(res)=>{
    console.log(res);
});
const item = document.querySelectorAll('.CanDrag');
item.forEach(element => {
  console.log(element)
  element.addEventListener("dragstart", ()=>{
  console.log(element.className[0]+" "+element.className[2]);
  socket.emit("ChessCORD",element.className[0],element.className[2]);
  });
});
function dragStart()
{
  console.log("drag start")
}
// receive a message from the server
socket.on("Hello", (arg) => {
    console.log(arg);
});
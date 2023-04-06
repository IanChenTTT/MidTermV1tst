const {io} = require("socket.io-client");
const socket = io("ws://localhost:3000");
// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) },(res)=>{
    console.log(res);
});

// receive a message from the server
socket.on("Hello", (arg) => {
    console.log(arg);
});
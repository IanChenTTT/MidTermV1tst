const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const path = require("path");
const io = new Server(httpServer, {
    path: "/ChessRoom"
});
console.log(path.sep)
console.log(path.join(__dirname,'..','client'))
console.log(__dirname)
app.use(express.static(path.join(__dirname,'..','client')))
app.use("/",(req,res)=>{
    res.end("<h1>Testing sokcet io and express is working or not</h1>");
})
app.use("ChessRoom",(req,res)=>{
  res.send(path.join())
})
app.all('*',(req,res)=>{
    res.end("<h1>404 NOT FOUND</h1>");
})
// app.all('*',(req, res) => {
//   res.status(404).send("resource not found");
// });
io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);
  socket.emit("Hello", (res) => {
    console.log("server send it", res);
  });
  socket.on("hello from client", (...arg) => {
    console.log(arg);
  });
});

httpServer.listen(3000,()=>{
    console.log("connet to port 3000")
});

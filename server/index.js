const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const EachGame = require("../public/Util/EachGame");
const app = express();
const httpServer = createServer(app);
const path = require("path");
const io = new Server(httpServer);
//   , {
//     path: "/ChessRoom"
// });
// console.log(path.sep)
// console.log(path.join(__dirname,'..','client'))
console.log(__dirname)
let PlayerGame = new EachGame();
app.use(express.static(path.join(__dirname,'..','client')));
app.use(express.static(path.join(__dirname,'..','public/Util')));
app.use("/",(req,res)=>{
    res.end("<h1>Testing sokcet io and express is working or not</h1>");
})
// app.use("ChessRoom",(req,res)=>{
//   res.send(path.join())
// })
app.all('*',(req,res)=>{
    res.end("<h1>404 NOT FOUND</h1>");
})
// app.all('*',(req, res) => {
//   res.status(404).send("resource not found");
// });
io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);
  socket.on("ChessCORD",async (...arg)=>{
    console.log(arg[0],arg[1])
  //  PlayerGame.getTarget(arg).then((...resolve)=>{
  //   console.log(resolve);
  //  });
    const result = await PlayerGame.getTarget(arg[0],arg[1]);
    console.log(result)
  })
});

httpServer.listen(3000,()=>{
    console.log("connet to port 3000")
});

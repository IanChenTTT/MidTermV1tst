const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const EachGame = require("../public/Util/EachGame");
const app = express();
const httpServer = createServer(app);
const path = require("path");
const io = new Server(httpServer);
const PORT = 3000 || process.env.PORT;
console.log(PORT);
//   , {
//     path: "/ChessRoom"
// });
// console.log(path.sep)
// console.log(path.join(__dirname,'..','client'))
console.log(__dirname);
let PlayerGame = new EachGame();
app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.static(path.join(__dirname, "..", "public/Util")));
app.use("/", (req, res) => {
  res.end("<h1>Testing sokcet io and express is working or not</h1>");
});
// app.use("ChessRoom",(req,res)=>{
//   res.send(path.join())
// })
app.all("*", (req, res) => {
  res.end("<h1>404 NOT FOUND</h1>");
});
// app.all('*',(req, res) => {
//   res.status(404).send("resource not found");
// });
let counter = 0;
io.on("connection", (socket) => {
  let DataisCreate = false;
  console.log("a user is connected", socket.id);

  socket.on("ChessCORD", (y, x) => {
    console.log(y, x);

    PlayerGame.getTarget(y, x).then(() => {
      console.log(PlayerGame.Target);
      socket.emit("Gettarget", PlayerGame.Target);
      DataisCreate = true;
      return PlayerGame.Target;
    });
  });

  socket.on("dragEnd", (arg) => {
    console.log(arg);
    socket.emit("Returntarget",PlayerGame.Target);
  });
});

httpServer.listen(3000, () => {
  console.log("connet to port 3000");
});

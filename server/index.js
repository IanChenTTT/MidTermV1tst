const express = require("express");
const { createServer, get } = require("http");
const { Server } = require("socket.io");
const EachGame = require("../public/Util/EachGame");
const { Userjoin, getUserID, getAlluserS } = require("../public/Util/User");
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
io.on("connection", async (socket) => {
  // Client join Room
  let DataisCreate = false;
  socket.on("joinRoom", (thisUsername, thisRoom) => {
    console.log(thisUsername, thisRoom);
    const user = Userjoin(socket.id, thisUsername, thisRoom);
    socket.join(user.room);
    console.log(user.Iswhite);
    socket.emit("WhiteORBlack", user.Iswhite);
    let PlayerGame = new EachGame(user.Iswhite);
    console.log("a user is connected", socket.id, `Room id is ${thisRoom}`);
    console.log(
      `Current User Color ${PlayerGame.getUserColor()} + ${getUserID(1)}`
    );
    socket.broadcast.to(user.room).emit("UserEnterMSG", user.name);
    // Player event is right here
    socket.on("ChessCORD", (y, x) => {
      console.log(y, x);
      PlayerGame.getTarget(y, x).then(() => {
        console.log(PlayerGame.Target);
        console.log(PlayerGame.OpponentTar);
        socket.emit("Gettarget", PlayerGame.Target);
        socket.broadcast
          .to(user.room)
          .emit("Gettarget", PlayerGame.OpponentTar);
        DataisCreate = true;
        return PlayerGame.Target;
      });
    });
    socket.on("JudgeColor", (...arg) => {
      console.log("JudgeColor", arg[0], arg[1]);
      let y = parseInt(arg[0]);
      let x = parseInt(arg[1]);
      if (PlayerGame.getBordColor(y, x) === PlayerGame.getUserColor())
        socket.emit("ResultColor", true, y, x);
      else socket.emit("ResultColor", false, y, x);
    });
    socket.on("dragEnd", (arg) => {
      console.log("going return ", arg);
      socket.emit("ReturnTarget", PlayerGame.Target);
      socket.broadcast
        .to(user.room)
        .emit("ReturnTarget", PlayerGame.OpponentTar);
    });
    socket.on("dropTarget", (target, origin) => {
      console.log(target);
      let y = origin[0] - 0;
      let x = origin[2] - 0;
      let y1 = target[0] - 0;
      let x1 = target[2] - 0;
      let Pic = PlayerGame.getBordColor(y, x);
      let Pic2 = Object.values(PlayerGame.getSearchHistory(y, x));
      console.log(Pic, Pic2[0]);
      PlayerGame.Target.forEach((element) => {
        console.log(target === element);
        console.log(y, x, y1, x1, "test drop");
        if (target === element) {
          socket.emit("drop", element, origin, `${Pic}${Pic2}`, [y, x, y1, x1]);
          let opponentTar = `${7 - element[0]}` + "_" + `${7 - element[2]}`;
          let opponentOrigin = `${7 - origin[0]}` + "_" + `${7 - origin[2]}`;
          console.log(opponentTar, opponentOrigin);
          socket.broadcast
            .to(user.room)
            .emit("drop", opponentTar, opponentOrigin, `${Pic}${Pic2}`, [
              7 - y,
              7 - x,
              7 - y1,
              7 - x1,
            ]);
        }
      });
    });
    socket.on("UserBoardChange", (Arr) => {
      console.log(Arr);

      PlayerGame.setCurrentHistory(Arr[0], Arr[1],Arr[2], Arr[3]);
      PlayerGame.setBoardColor(Arr[0], Arr[1],Arr[2], Arr[3]);
      console.table(PlayerGame.getChess_Board);
      console.table(PlayerGame.getUserColor2D());
    });
  });
  socket.on("error", (err) => {
    console.err(err);
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
});

httpServer.listen(PORT, () => {
  console.log("connet to port 3000");
});

require("dotenv").config();
const express = require("express");
const { createServer, get } = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const sess_opt = require("./sessoion_db");
const cors = require("cors");
const ejs = require("ejs");
const crypto = require("crypto");
const CryptoJSAesJson = require("./cryptojs-aes-format");
const { Auth, User_IsAuth } = require("./Auth");
const {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} = require("./error_Handle");

const EachGame = require("../public/Util/EachGame");
const { Userjoin, getUserID, getAlluserS } = require("../public/Util/User");

const app = express();
const httpServer = createServer(app);
const path = require("path");
const sessionStore = new MySQLStore(sess_opt);
const RoomMap = new Map();
// APP SETTING
if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.set("trust proxy", (ip) => {
  if (ip === process.env.TRUST_IP1 || ip === process.env.TRUST_IP2)
    return true; // trusted IPs
  else return false;
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
const whiteList = [process.env.WEBSITE];
app.use(
  cors({
    origin: whiteList[0],
  })
);
const sessMidleware = session({
  key: "NODEID",
  secret: process.env.SESS_KEY,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 },
});
app.use(sessMidleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use("/Loby",express.static(path.join(__dirname, "..", "client/Game")));
app.use(express.static(path.join(__dirname, "..", "public/Util")));
const PORT = process.env.PORT;
const Host = process.env.Host;
console.log(PORT);
// METHOD
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

app.post("/Loby/Login", async (req, res, next) => {
  let comp = Date.now() / 1000;
  // console.log(comp);
  let date1 = new Date(comp * 1000);
  const hr = date1.getHours();
  const mins = date1.getMinutes();
  const sec = date1.getSeconds();
  const ans2 = `${padTo2Digits(hr)}:${padTo2Digits(mins)}:${padTo2Digits(sec)}`;
  let POST_Val = JSON.stringify(req.body.data);
  let method = process.env.POST_KEY;
  let secret = POST_Val; //must be 32 char length
  let decrypt = await CryptoJSAesJson.decrypt(secret, method);
  let decrypt_Parse = decrypt.split("_");
  const date = new Date(decrypt_Parse[0] * 1000);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();
  const ans = `${padTo2Digits(hour)}:${padTo2Digits(minutes)}:${padTo2Digits(
    second
  )}`;
  console.log(ans2, ans);

  try {
    const result = await Auth(decrypt_Parse[1]);
    if (isObjectEmpty(result) === true) {
      throw new Error("user not found");
    } else {
      req.session.User_Auth = true;
      req.session.User_info = {
        users_id: result.users_id,
        users_sid: result.users_uid,
      };
      console.log("is_auth", result.users_uid);
      res.send(req.sessionID);
    }
  } catch (err) {
    next(err);
  }
});

app.use(
  "/Loby/static/",
  User_IsAuth,
  express.static(path.join(__dirname, "../client"))
);
app.get("/Loby/", User_IsAuth, (req, res) => {
  res.locals.User = req.session.User_info;
  res.render("index");
});
app.get("/Loby/Room", (req, res) => {
  if (RoomMap.has(req.query.room))
    req.session.User_GameID = RoomMap.get(req.query.room);
  else {
    req.session.User_GameID = crypto.randomUUID();
    RoomMap.set(req.query.room, req.session.User_GameID);
  }
  res.render("chessRoom", { User: req.session.User_info });
});
app.post("/loby/Logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.redirect("http://localhost/HWdoc/Home/includes/logout.inc.php");
      }
    });
  } else {
    res.status(400).send("Unable to log out");
    res.end();
  }
});
// app.get("/Loby/test", async (req, res) => {
//   console.log(req.sessionID);
//   res.send(`<h1>${req.session.User_Auth}</h1>`);
// });

const io = new Server(httpServer, {
  path: "/Loby/Room/socket.io",
  cors: {
    origin: process.env.WEBSITE,
    methods: ["GET", "POST"],
  },
});
// app.all("*", (req, res) => {
//   res.end("<h1>404 NOT FOUND</h1>");
// });
io.engine.use(sessMidleware);
let counter = 0;
io.on("connection", async (socket) => {
  // Client join Room
  let DataisCreate = false;
  const session = socket.request.session;
  if (typeof session.User_GameID !== "undefined")
    socket.emit("RoomID", session.User_GameID);
  socket.on("joinRoom", (thisRoomID) => {
    console.log(session.User_info.users_id, thisRoomID);
    const user = Userjoin(socket.id, session.User_info.users_id, thisRoomID);
    socket.join(thisRoomID);
    console.log(user.Iswhite);
    socket.emit("WhiteORBlack", user.Iswhite);
    let PlayerGame = null
    if(typeof session.User_Game !== "undefined")
          PlayerGame = new EachGame(session.User_Game.Myrecord)
    else
        PlayerGame = new EachGame(user.Iswhite);
    console.log("a user is connected", socket.id, `Room id is ${thisRoomID}`);
    console.log(
      `Current User Color ${PlayerGame.getUserColor()} + ${getUserID(1)}`
    );
    socket.broadcast.to(thisRoomID).emit("UserEnterMSG", user.name);
    // Player event is right here
    socket.on("ChessCORD", (y, x) => {
      console.log(y, x);
      PlayerGame.getTarget(y, x).then(() => {
        console.log(PlayerGame.Target);
        console.log(PlayerGame.OpponentTar);
        socket.emit("Gettarget", PlayerGame.Target);
        socket.broadcast
          .to(thisRoomID)
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
        .to(thisRoomID)
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
            .to(thisRoomID)
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

      PlayerGame.setCurrentHistory(Arr[0], Arr[1], Arr[2], Arr[3]);
      PlayerGame.setBoardColor(Arr[0], Arr[1], Arr[2], Arr[3]);
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
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);
// SERVER ONLY CONNECT BIND TO LOCAL HOST
httpServer.listen(PORT, Host, () => {
  console.log(`connect to ${PORT}`);
});

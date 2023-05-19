const session = require("express-session");
const { DB_Auth } = require("./db");
function User_IsAuth(req, res, next) {
  if (!req.session.User_Auth) {
    res.status(401);
    res.redirect('http://localhost')
    // return res.send(`<h1>${req.session.User_Auth}<h1>`);
  }
  else{
  next();
  }
}
async function Auth(Arg) {
  res = await DB_Auth(Arg);
  if (!res.length) {
    console.log("not found");
    return "";
  }
  return res[0];
}
module.exports = { Auth, User_IsAuth };

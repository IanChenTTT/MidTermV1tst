app.post("/Loby/test1", (req, res) => {
  console.log(req.sessionID);
  let a = req.body.data;
  a = JSON.stringify(req.body.data);
  console.log(`'${a}'`);
  //  console.log(req.body.data);
  req.session.USER = `'${a}'`;
  res.send(req.session);
});
require("dotenv").config();
const setting = {
  host: process.env.Host,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
};
async function DB_Auth(uuid) {
  // get the client
  // create the connection
  const connection = await DB_CONNECT();
  // query database
  const [rows, fields] = await connection.execute(
    "SELECT * FROM `users` WHERE `users_id` = ?",
    [`${uuid}`],
    function (err, results, fields) {
      if(err) throw err;
    }
  );
  await connection.end();
  return rows;
}

function DB_CONNECT() {
  try {
    const mysql = require("mysql2/promise");
    const connection = mysql.createConnection(setting, function (err) {
      if (err) {
        connection.end();
        throw err;
      }
    });
    return connection;
  } catch (err) {
    console.log(err);
  }
}
module.exports={DB_CONNECT,DB_Auth}
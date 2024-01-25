const mysql = require("mysql");
const dotenv = require("dotenv");
const util = require("util");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.query = util.promisify(connection.query).bind(connection);

connection.end = util.promisify(connection.end).bind(connection);

connection.connect(function (err) {
  if (err) {
    console.log("error connecting: " + err.stack);
    return err;
  } else {
    console.log("connected");
  }
});

// console.log(connection);

module.exports = connection;

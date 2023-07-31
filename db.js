const mysql = require("mysql2");

// MySQL接続情報
const connection = mysql.createConnection({
  host: "db",
  user: "shiro",
  password: "shiro",
  database: "api_basic"
});

// MySQL接続
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

module.exports = connection;

const express = require("express");
const app = express();
const connection = require("./db");

// POSTリクエストのボディーをパースするためのミドルウェア
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ルートエンドポイント
app.get("/", (req, res) => {
  res.send("Hello, this is the home page!");
});

// 投稿フォームのルートエンドポイント
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

// データベースからデータを取得して出力
app.get("/data", (req, res) => {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// フォームデータを受け取ってデータベースに挿入
app.post("/submit", (req, res) => {
  const { name, profile } = req.body;
  const post = { name, profile };

  connection.query("INSERT INTO users SET ?", post, (err, result) => {
    if (err) throw err;
    res.send("Data inserted successfully!");
  });
});

// サーバーを起動
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

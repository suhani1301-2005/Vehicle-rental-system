const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Acer@1234",
  database: "rental_db"
});

db.connect((err) => {
  if (err) {
    console.log("Connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = db;
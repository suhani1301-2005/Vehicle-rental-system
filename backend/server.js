const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DB CONNECTION ================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Acer@1234",
  database: "rental_db"
});

db.connect(err => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) return res.json({ message: "User already exists" });
        res.json({ message: "User Registered Successfully" });
      }
    );
  } catch {
    res.json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ADMIN LOGIN
    if (
      (email === "suhanisaxena11@gmail.com" && password === "suhani123") ||
      (email === "pratikshagotmare12@gmail.com" && password === "pratiksha123")
    ) {
      return res.json({
        message: "Login Success",
        user: { name: "Admin", email, role: "admin" }
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {

        if (err) return res.json({ message: "Server error" });
        if (result.length === 0) return res.json({ message: "User not found" });

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.json({ message: "Wrong Password" });

        res.json({
          message: "Login Success",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: "user"
          }
        });
      }
    );

  } catch {
    res.json({ message: "Server error" });
  }
});

//cart

app.post("/create-order", (req, res) => {
  const { customer, items } = req.body;

  if (!customer || !items) {
    return res.status(400).json({ success: false });
  }

  // 🔥 MySQL insert
  const query = `
    INSERT INTO rentals 
    (customerId, vehicleName, vehicleType, brand, fuelType, color, pricePerDay, startDate, endDate)
    VALUES ?
  `;

  const values = items.map(item => [
    1, // temporary customerId
    item.vehicleName,
    item.vehicleType,
    item.brand,
    item.fuelType,
    item.color,
    item.pricePerDay,
    item.startDate,
    item.endDate
  ]);

  db.query(query, [values], (err, result) => {
    if (err) {
      console.log("DB ERROR ❌", err);
      return res.json({ success: false });
    }

    res.json({
      success: true,
      orderId: "ORD" + Date.now()
    });
  });
});
/* ================= ANALYTICS ================= */

  app.get("/analytics", (req, res) => {

  const revenueQuery = `
    SELECT 
      vehicleType,
      COUNT(*) AS count,
      SUM(pricePerDay * DATEDIFF(endDate, startDate)) AS revenue
    FROM rentals
    GROUP BY vehicleType
  `;

  const trendQuery = `
    SELECT 
      DATE_FORMAT(startDate, '%b') AS month,
      SUM(pricePerDay * DATEDIFF(endDate, startDate)) AS revenue
    FROM rentals
    GROUP BY month
    ORDER BY MIN(startDate)
  `;

  const customerQuery = `
    SELECT 
      customers.name,
      COUNT(rentals.id) AS totalRentals
    FROM customers
    LEFT JOIN rentals ON customers.id = rentals.customerId
    GROUP BY customers.id
    ORDER BY totalRentals DESC
    LIMIT 5
  `;

  db.query(revenueQuery, (err, revenueData) => {
    if (err) return res.json({});

    db.query(trendQuery, (err2, trendData) => {

      db.query(customerQuery, (err3, customerData) => {

        const totalRevenue = (revenueData || []).reduce(
          (sum, item) => sum + (item.revenue || 0),
          0
        );

        const totalRentals = (revenueData || []).reduce(
          (sum, item) => sum + (item.count || 0),
          0
        );

        res.json({
          totalRevenue,
          totalRentals,
          revenueByVehicle: revenueData || [],
          monthlyTrend: trendData || [],
          customerRentals: customerData || []
        });
      });
    });
  });
});

/* ================= SERVER ================= */
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
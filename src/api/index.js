const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Database connection
const connection = mysql.createConnection({
  host: "your_database_host",
  user: "your_username",
  password: "your_password",
  database: "your_database_name",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Helper function for executing queries
const query = (sql, args) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Routes
app.get("/products", async (req, res) => {
  const products = await query("SELECT * FROM products");
  res.json(products);
});

app.get("/products/:id", async (req, res) => {
  const product = await query("SELECT * FROM products WHERE id = ?", [
    req.params.id,
  ]);
  res.json(product[0]);
});

app.post("/products", async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const result = await query(
    "INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)",
    [name, description, price, imageUrl]
  );
  const newProduct = await query("SELECT * FROM products WHERE id = ?", [
    result.insertId,
  ]);
  res.status(201).json(newProduct[0]);
});

app.put("/products/:id", async (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  await query(
    "UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?",
    [name, description, price, imageUrl, req.params.id]
  );
  const updatedProduct = await query("SELECT * FROM products WHERE id = ?", [
    req.params.id,
  ]);
  res.json(updatedProduct[0]);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

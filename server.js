const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ E-commerce backend is running successfully 🚀");
});
// Temporary test route for products
app.get("/api/products", (req, res) => {
  res.json([
    { _id: 1, name: "Laptop", price: 599 },
    { _id: 2, name: "Headphones", price: 199 },
    { _id: 3, name: "Smartwatch", price: 299 },
  ]);
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

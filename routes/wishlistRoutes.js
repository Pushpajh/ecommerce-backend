const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");

let wishlist = {}; // temporary store

router.post("/add", (req, res) => {
  const { userId, productId } = req.body;
  if (!wishlist[userId]) wishlist[userId] = [];
  wishlist[userId].push(productId);
  res.json({ message: "Added to wishlist" });
});

router.get("/:userId", (req, res) => {
  res.json(wishlist[req.params.userId] || []);
});

module.exports = router;

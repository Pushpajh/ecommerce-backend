const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Add to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });
  cart.items.push({ productId, quantity });
  await cart.save();
  res.json({ message: "Added to cart" });
});

// Remove from cart
router.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  let cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    await cart.save();
  }
  res.json({ message: "Removed from cart" });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// 📦 Get all wishlists
router.get("/", async (req, res) => {
  try {
    const wishlists = await Wishlist.find();
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ Add product to wishlist
router.post("/", async (req, res) => {
  try {
    const wishlist = new Wishlist({
      userId: req.body.userId,
      products: [{ productId: req.body.productId }]
    });
    const newWishlist = await wishlist.save();
    res.status(201).json(newWishlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ❌ Delete wishlist
router.delete("/:id", async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });
    res.json({ message: "Wishlist deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const DisburseProduct = require("../models/disburse_products");
const Product = require("../models/product.model");
const express = require("express");
const router = express.Router();

router.get("/get-all-product", async (req, res) => {
  try {
    const allProducts = await Product.find({}).populate("distributor");

    return res.status(200).json({ allProducts, message: "Fetching success!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

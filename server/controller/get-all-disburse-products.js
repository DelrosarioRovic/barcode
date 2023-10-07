const DisburseProduct = require("../models/disburse_products");
const Product = require("../models/product.model");
const express = require("express");
const router = express.Router();

router.get("/get-all-disburse-product", async (req, res) => {
  try {
    const allProducts = await DisburseProduct.find({})
      .populate({
        path: "products",
        model: "Product", // Replace with your actual Product model name
      })
      .populate("distributor");
      if (allProducts.length === 0) {
        return res.status(400).json({ error: "No request found!" });
      }
    return res.status(200).json({ allProducts, message: "Fetching success!" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-single-disburse-product/:refference", async (req, res) => {
  const { refference } = req.params;
  try {
    const singleDisburse = await DisburseProduct.find({ _id: refference })
      .populate({
        path: "products",
        model: "Product", 
      })
      .populate("distributor");
      if (singleDisburse.length === 0) {
        return res.status(400).json({ error: "No request found!" });
      }
      return res.status(200).json({ singleDisburse });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

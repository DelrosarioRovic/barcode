const axios = require("axios");
const Distributor = require("../models/distributor.model");
const Product = require("../models/product.model");
const DisburseProduct = require("../models/disburse_products");
const express = require("express");
const router = express.Router();

router.post("/disburse-product", async (req, res) => {
  const { products, distributorId, shopifyProduct } = req.body;

  const serialNumbers = products.map((product) => product.serialNumber);

  // Find products with serial numbers in the extracted array
  const foundProducts = await Product.find({
    serialNumber: { $in: serialNumbers },
  });

  if (!foundProducts) {
    return res.status(400).json({ error: "No product found!" });
  }

  const foundProductsMap = foundProducts.map((product) => product.id);

  await Product.updateMany(
    { _id: { $in: foundProductsMap } },
    { $set: { status: "out" } }
  );

  const disburse = new DisburseProduct({
    products: foundProductsMap,
    distributor: distributorId,
    date: new Date(),
  });
  
  await disburse.save();
});

module.exports = router;

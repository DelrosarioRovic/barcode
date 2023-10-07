const axios = require("axios");
const Distributor = require("../models/distributor.model");
const Product = require("../models/product.model");
const DisburseProduct = require("../models/disburse_products");
const express = require("express");
const router = express.Router();

const shopifyUrl = "https://store-formyapptest.myshopify.com";
const apiKey = "768ea65e8e236cc3b90bbb11346e720a";
const apiPassword = "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";

router.post("/disburse-product", async (req, res) => {
  const { products, distributorId, shopifyProduct } = req.body;

  const serialNumbers = products.map((product) => product.serialNumber);

  // Find products with serial numbers in the extracted array
  const foundProducts = await Product.find({
    serialNumber: { $in: serialNumbers },
  });
  const distributor = await Distributor.findById(distributorId);

  if (!distributor) {
    return res.status(400).json({ error: "Please select a distributor!" });
  }

  if (foundProducts.length === 0) {
    return res.status(400).json({ error: "No product found!" });
  }

  // Create a map to track how many times each SKU appears
  const skuMap = new Map();

  shopifyProduct.forEach((product) => {
    const sku = product.sku;
    if (skuMap.has(sku)) {
      skuMap.set(sku, skuMap.get(sku) + 1);
    } else {
      skuMap.set(sku, 1);
    }
  });

  // Collect errors in an array
  const errors = [];
  const error_sku = [];

  // Deduct inventory for each product in shopifyProduct
  await Promise.all(
    shopifyProduct.map(async (product) => {
      const newQuantity = product.inventory_quantity - skuMap.get(product.sku);
      const inventoryItemId = product.inventory_item_id;

      if (skuMap.get(product.sku) > product.inventory_quantity) {
        errors.push(`Insufficient inventory level for some of the SKU`);
        error_sku.push(`${product.sku}`);
      } else {
        const updatedQuantity = await axios.post(
          `${shopifyUrl}/admin/api/2023-07/inventory_levels/set.json`,
          {
            location_id: 90570850602,
            inventory_item_id: inventoryItemId,
            available: newQuantity,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            auth: {
              username: apiKey,
              password: apiPassword,
            },
          }
        );
        return updatedQuantity;
      }
    })
  );

  // Check if there were any errors
  if (errors.length > 0) {
    return res.status(400).json({ errors, error_sku });
  }

  const foundProductsMap = foundProducts.map((product) => product.id);

  await Product.updateMany(
    { _id: { $in: foundProductsMap } },
    { $set: { status: "out", distributor: distributorId } }
  );
  

  const disburse = new DisburseProduct({
    products: foundProductsMap,
    distributor: distributorId,
    date: new Date(),
  });

  await disburse.save();

  return res.status(200).json({
    message: "Successfully disburse products",
  });
});

module.exports = router;

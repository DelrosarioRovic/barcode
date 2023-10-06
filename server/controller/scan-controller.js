const axios = require("axios");
const Product = require("../models/product.model");
const express = require("express");
const router = express.Router();

// Shopify API credentials
const shopifyUrl = "https://mynewstoretest01.myshopify.com";
const apiKey = "768ea65e8e236cc3b90bbb11346e720a";
const apiPassword = "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";
const url = `${shopifyUrl}/admin/api/2023-07/products.json`;

function linearSearch(arr, target) {
  for (const product of arr) {
    for (const variant of product.variants) {
      if (variant.sku === target) {
        return variant; // Found the target SKU, return the variant
      }
    }
  }
  return "No Product Exist"; // Target SKU not found in any variant
}

router.post("/scan-product/:serialNumber", async (req, res) => {
  const { serialNumber } = req.params;

  const foundProduct = await Product.findOne({ serialNumber });

  try {
    if (!foundProduct) {
      return res.status(400).json({
        error: "No product Found",
      });
    }

    if (foundProduct.status === "OUT") {
      return res.status(400).json({ error: "This product is already out" });
    }

    const { data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": `${apiPassword}`,
      },
    });

    const foundShopifyProduct = linearSearch(data.products, foundProduct.product_sku);

    if (!foundShopifyProduct || foundShopifyProduct === "No Product Exist") {
      return res.status(404).json({
        error: "Product with this serial number does not exist",
      });
    }

    if (foundShopifyProduct.inventory_quantity <= 0) {
      return res
        .status(400)
        .json({ error: "This product is out of stock in shopify!" });
    }

    return res.status(200).json({
      foundProduct,
      foundShopifyProduct,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

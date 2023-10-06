const express = require("express");
const ProductController = require("../controllers/productController");

const router = express.Router();

// Product Scan Route
router.post("/scan-product/:serialNumber", ProductController.productScanner);
// Product Scan Many Route
router.post("/disburse-products", ProductController.disburseProduct);
// Get All Products
router.get("/get-products", ProductController.getAllProducts);

module.exports = router;

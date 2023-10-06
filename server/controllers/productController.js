const axios = require("axios");
const { v4: uuid } = require("uuid");
const Distributor = require("../model/distributor");
const Product = require("../model/product");
const DisbursedProduct = require("../model/disbursed_product");

// Shopify API credentials
const shopifyUrl = "https://quickstart-d024bb3c.myshopify.com";
const apiKey = "e47c1411d57f10cc7e5f7ec1bbaa367b";
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

const productController = {
  // Product Scan Controller
  productScanner: async (req, res) => {
    try {
      const { serialNumber } = req.params;

      const foundProduct = await Product.findByPk(serialNumber);

      if (!foundProduct) {
        return res.status(400).json({ error: "Please scan product" });
      }

      if (!foundProduct) {
        console.log("Product with this serial number does not exist");
        return res.status(404).json({
          error: "Product with this serial number does not exist",
        });
      }

      if (foundProduct.status === "out") {
        console.log("This product is already out");
        return res.status(400).json({ error: "This product is already out" });
      }

      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": `${apiPassword}`,
        },
      });

      const foundShopifyProduct = linearSearch(
        data.products,
        foundProduct.product_sku
      );

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
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Scan multiple products
  disburseProduct: async (req, res) => {
    try {
      const { distributorId } = req.body;
      const shopifyProduct = req.body.shopifyProduct;
      const products = req.body.products;
      // Extract serial numbers from the products array
      const serialNumbers = products.map((product) => product.serialNumber);

      // Check if the distributor exists
      const distributor = await Distributor.findByPk(distributorId);

      if (!distributor) {
        return res.status(400).json({ error: "Please select a distributor." });
      }

      // Check if the products exist
      const checkProducts = await Product.findAll({
        where: { serialNumber: serialNumbers },
      });

      if (checkProducts.length === 0) {
        return res
          .status(400)
          .json({ error: "Please insert a serial number." });
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
          const newQuantity =
            product.inventory_quantity - skuMap.get(product.sku);
          const inventoryItemId = product.inventory_item_id;

          if (skuMap.get(product.sku) > product.inventory_quantity) {
            errors.push(`Insufficient inventory level for some of the SKU`);
            error_sku.push(`${product.sku}`);
          } else {
            const updatedQuantity = await axios.post(
              `${shopifyUrl}/admin/api/2023-07/inventory_levels/set.json`,
              {
                location_id: 90335248676,
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

      // Insert the disbursed product in the disbursed_product table
      const referenceId = uuid();
      await DisbursedProduct.create({
        referenceId,
        distributorId,
        products: serialNumbers,
      });

      // Update product status to 'out' for the specified serial numbers
      await Product.update(
        { status: "out" }, // Updated data (values)
        { where: { serialNumber: serialNumbers } } // Condition (options)
      );

      return res.status(200).json({
        message: `Products [${serialNumbers.join(
          ", "
        )}] disbursed to distributor ${distributor.storeName}.`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // Get All products
  getAllProducts: async (req, res) => {
    try {
      const { referenceId } = req.body;

      const disbursedProducts = await DisbursedProduct.findAll({
        where: { referenceId },
        include: [Product, Distributor],
      });

      return res
        .status(200)
        .json({ disbursedProducts, message: "Fetching success!" });
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = productController;

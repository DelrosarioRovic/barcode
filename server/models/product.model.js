const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  serialNumber: {
    type: String,
    required: true,
  },
  product_sku: {
    type: String,
    required: true,
  },
  imeiOne: {
    type: String,
    required: true,
  },
  imeiTwo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["in", "out"],
    default: "in",
  },
  distributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Distributor",
    required: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

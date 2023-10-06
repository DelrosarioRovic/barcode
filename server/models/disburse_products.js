const mongoose = require("mongoose");

const disburseProductSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  distributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Distributor",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const DisburseProduct = mongoose.model(
  "DisburseProduct",
  disburseProductSchema
);

module.exports = DisburseProduct;

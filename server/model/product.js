const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connection/db");
const Distributor = require("./distributor");

const Product = sequelize.define(
  "products",
  {
    serialNumber: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    product_sku: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imeiOne: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imeiTwo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "in", // Set the default value to "in"
    },
  },
  {
    timestamps: false,
  }
);

// Product.associate = (models) => {
//   Product.hasMany(models.DisbursedProduct, {
//     foreignKey: "serialNumber",
//   });
// };

sequelize.sync();

module.exports = Product;

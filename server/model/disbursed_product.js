const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connection/db");

const DisbursedProduct = sequelize.define(
  "disbursed_product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    referenceId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: {
      dateformat: "YYYY-MM-DD",
    },
  }
);

DisbursedProduct.associate = (models) => {
  DisbursedProduct.belongsTo(models.Distributor, {
    foreignKey: "distributorId",
  });
  DisbursedProduct.belongsTo(models.Product, {
    foreignKey: "serialNumber",
  });
};

sequelize.sync();

module.exports = DisbursedProduct;

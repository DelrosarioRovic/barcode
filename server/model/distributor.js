const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connection/db");

const Distributor = sequelize.define(
  "distributor",
  {
    distributorId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    storeName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: {
      dateformat: "YYYY-MM-DD",
    },
  }
);

// Distributor.associate = (models) => {
//   Distributor.hasMany(models.DisbursedProduct, {
//     foreignKey: "distributorId",
//   });
// };

sequelize.sync();

module.exports = Distributor;

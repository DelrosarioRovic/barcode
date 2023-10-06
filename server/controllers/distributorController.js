const { v4: uuid } = require("uuid");
const Distributor = require("../model/distributor");

const productController = {
  // Add New Distributor Controller
  addDistributor: async (req, res) => {
    try {
      const { storeName, address, email, contactNumber } = req.body;

      const distributorAlreadyExist = await Distributor.findOne({
        where: { storeName },
      });

      if (!address) {
        return res.status(404).json({ error: "Address is required" });
      }

      if (!email) {
        return res.status(404).json({ error: "Email is required" });
      }

      // if (email === distributorAlreadyExist.email) {
      //   return res.status(404).json({ error: "Email already exist" });
      // }

      if (!contactNumber) {
        return res.status(404).json({ error: "Contact number is required" });
      }

      if (distributorAlreadyExist) {
        return res
          .status(400)
          .json({ error: "This distributor already exist" });
      }

      const newDistributor = await Distributor.create({
        distributorId: uuid(),
        storeName,
        address,
        email,
        contactNumber,
      });

      return res
        .status(200)
        .json({ newDistributor, message: "Distributor added successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get All Distributor Controller
  getAllDistributor: async (req, res) => {
    try {
      const allDistributor = await Distributor.findAll();

      if (allDistributor.length === 0) {
        return res.status(200).json({ message: "Currently no distributors" });
      }

      return res
        .status(200)
        .json({ allDistributor, message: "Distributors fetched successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = productController;

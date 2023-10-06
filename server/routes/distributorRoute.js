const express = require("express");
const DistributorController = require("../controllers/distributorController");

const router = express.Router();

// Add New Distributor Route
router.post("/add-distributor", DistributorController.addDistributor);
// Get All Distributor
router.get("/get-distributor", DistributorController.getAllDistributor);

module.exports = router;

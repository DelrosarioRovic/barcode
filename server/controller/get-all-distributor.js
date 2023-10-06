const Distributor = require("../models/distributor.model");
const express = require("express");
const router = express.Router();

router.get("/get-distributor", async (req, res) => {
  try {
    const distributor = await Distributor.find({});
    if (!distributor) {
      return res.status(400).json({ error: "No distributor" });
    }
    return res.status(200).json({ allDistributor: distributor });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

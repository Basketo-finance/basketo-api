const express = require("express");
const { getCoinPrice, getCoinGrowthRate } = require("../controllers/coinData");
const router = express.Router();

router.get("/price/:coin/:currency", getCoinPrice);
router.get("/growth-rate/:coin/:days", getCoinGrowthRate);

module.exports = router;

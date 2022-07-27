var express = require("express");
const {
  createBasket,
  getBasket,
  getBaskets,
} = require("../controllers/basket");
var router = express.Router();

router.post("/basket/new", createBasket);
router.get("/basket/:id", getBasket);
router.get("/baskets", getBaskets);

module.exports = router;

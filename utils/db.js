const Basket = require("../models/basket");

const singleBasket = (_id) => Basket.findOne({ _id });

module.exports = { singleBasket };

const Basket = require("../models/basket");
const { singleBasket } = require("../utils/db");

const createBasket = async (req, res) => {
  try {
    const basket = new Basket({
      accountId: req.body.accountId,
      name: req.body.name,
      description: req.body.description,
      symbol: req.body.symbol,
      coins: req.body.coins,
    });
    await basket.save();
    res.send(basket);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getBasket = async (req, res) => {
  try {
    const basket = await singleBasket(req.params.id);
    res.send(basket);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getBaskets = async (req, res) => {
  try {
    const baskets = await Basket.find();
    res.send(baskets);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createBasket,
  getBasket,
  getBaskets,
};

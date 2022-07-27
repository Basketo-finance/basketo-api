const { default: axios } = require("axios");

const getCoinPrice = (req, res) => {
  try {
    const { coin, currency } = req.body;
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`
      )
      .then((result) => res.json(result.data).status(200))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    res.status(400).json(err);
  }
};

const getCoinGrowthRate = (req, res) => {
  try {
    const { coin, days, weight } = req.body;
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=usd&days=${days}`
      )
      .then((result) => {
        const firstVal = result.data[0];
        const lastVal = result.data[result.data.length - 1];

        const growthRate =
          ((lastVal["2"] - firstVal["3"]) * 100) / lastVal["2"];

        res.json({
          name: coin,
          growthRate: growthRate,
          withWeight: (growthRate * weight) / 100,
        });
      })
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { getCoinPrice, getCoinGrowthRate };

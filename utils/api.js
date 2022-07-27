const { default: axios } = require("axios");

const getGraphData = (coin, days) =>
  axios.get(
    `https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=${days}`
  );

module.exports = { getGraphData };

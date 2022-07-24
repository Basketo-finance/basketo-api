const { default: axios } = require("axios");
const moment = require("moment");

async function getDataPoints(req, res) {
  try {
    const { basketData, days } = req.body;
    let growthRatePercentage = [],
      timeStamp;
    for (let i = 0; i < basketData.length; i++) {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${basketData[i].id}/ohlc?vs_currency=usd&days=${days}`
        )
        .then((result) => {
          let coinsObj = {
            [basketData[i].name]: result.data.map((item) => ({ ...item })),
          };

          let growthRate = coinsObj[basketData[i].name].map(
            (item) =>
              ((((item["4"] - item["1"]) * 100) / item["1"]) *
                [basketData[i].ratio]) /
              100
          );

          let timeStamps = coinsObj[basketData[i].name].map(
            (item) => item["0"]
          );
          timeStamp = timeStamps;
          growthRatePercentage.push(growthRate);
        })
        .catch(err => console.log(err))
    }
    var sum = (r, a) =>
      r.map((b, i) => {
        let num = a[i] + b;
        return Number(num.toFixed(5));
      });

    let totalGrowthRates = growthRatePercentage.reduce(sum);
    let array = [];
    const data = (a1, a2) =>
      a1.map((a, i) => {
        let obj = {
          point: a,
          timeStamp: moment(a2[i]).format("MMM Do YYYY hh:mm a"),
        };
        array.push(obj);
      });
    data(totalGrowthRates, timeStamp);
    res.status(200).json(array);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Error" });
  }
}

module.exports = {
  getDataPoints,
};

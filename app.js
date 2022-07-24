const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 8000;

require("dotenv").config();

const ohlcDataPts = require("./routes/ohlcDataPoints");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", ohlcDataPts);

app.get("/", (req, res) => {
  res.json({
    message: "HElloo!!",
  });
});

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

module.exports = app;

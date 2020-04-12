require("dotenv").config();
const axios = require("axios");
const moment = require("moment");

const token = process.env.FINHUB_API_TOKEN;

async function candlePrices(symbol, from, to, resolution) {
  const fromUnix = from.unix();
  const toUnix = to.unix();
  const url = `https://finnhub.io/api/v1/stock/candle?token=${token}`;
  const fullUrl = `${url}&symbol=${symbol}&from=${fromUnix}&to=${toUnix}&resolution=${resolution}`;
  console.log(fullUrl);
  const result = await axios.get(fullUrl);
  console.log(result);
  return result.data;
}

async function quote(symbol) {
  const url = `https://finnhub.io/api/v1/quote?token=${token}`;
  const fullUrl = `${url}&symbol=${symbol}`;
  console.log(fullUrl);
  const result = await axios.get(fullUrl);
  console.log(result);
  return result.data;
}

// candlePrices("TSLA", moment("2020-01-01"), moment(), "1");

module.exports = {
  candlePrices: candlePrices,
  quote: quote
};

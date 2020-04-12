const finance = require("yahoo-finance");

async function isMarketOpen() {
  const quote = await finance.quote({ symbol: "^GSPC", modules: ["price"] });
  return quote.price.marketState != "CLOSED";
}

modules.exports = {
  isMarketOpen: isMarketOpen
};

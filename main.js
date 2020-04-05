const finance = require("yahoo-finance");
const blessed = require("blessed");
const contrib = require("blessed-contrib");
const colors = require("colors/safe");
const _ = require("lodash");

async function fetch(tickers) {
  const quoteRequests = _.map(tickers, ticker =>
    finance.quote({ symbol: ticker, modules: ["price"] })
  );
  const quotes = await Promise.all(quoteRequests);
  console.log(quotes);
  return quotes;
}

function transform(quotes) {
  const parseFixFloat = f => Number.parseFloat(f).toFixed(2);
  return _.map(quotes, (quote, i) => {
    const change = parseFixFloat(quote.price.regularMarketChange);
    const color = change > 0 ? colors.green : colors.red;
    const changeP = parseFixFloat(quote.price.regularMarketChangePercent * 100);

    const pad = i == 0 ? "  " : "";
    return [
      quote.price.symbol,
      parseFixFloat(quote.price.regularMarketPrice),
      color(change),
      color(changeP)
    ];
  });
}

function renderTable(data) {
  const screen = blessed.screen();
  const table = contrib.table({
    keys: true,
    fg: "white",
    selectedFg: "white",
    selectedBg: "cyan",
    interactive: true,
    label: "Securities",
    width: "100%",
    height: "30%",
    border: { type: "line", fg: "cyan" },
    columnSpacing: 5,
    columnWidth: [6, 10, 15, 15]
  });

  table.focus();
  screen.append(table);

  table.setData({
    headers: ["Ticker", "Price", "Change", "Change %"],
    data: data
  });

  screen.key(["escape", "q", "C-c"], function(ch, key) {
    return process.exit(0);
  });

  screen.render();
}

async function main() {
  const tickers = process.argv.slice(2);
  const quotes = await fetch(tickers);
  const data = transform(quotes);
  console.log(data);
  renderTable(data);
}

main();

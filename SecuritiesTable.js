const finance = require("yahoo-finance");
const blessed = require("blessed");
const contrib = require("blessed-contrib");
const colors = require("colors/safe");
const _ = require("lodash");

class SecuritiesTable {
  constructor(screen, grid, tickers, isMarketOpen) {
    this.screen = screen;
    this.grid = grid;
    this.tickers = tickers;
    this.isMarketOpen = isMarketOpen;
    this.render();
    this.update();
  }

  fixFloat(num) {
    return Number.parseFloat(num).toFixed(2);
  }

  transformData(quotes) {
    return _.map(quotes, (quote, i) => {
      const change = this.fixFloat(quote.price.regularMarketChange);
      const color = change > 0 ? colors.green : colors.red;
      const changeP = this.fixFloat(
        quote.price.regularMarketChangePercent * 100
      );

      return [
        quote.price.symbol,
        this.fixFloat(quote.price.regularMarketPrice),
        color(change),
        color(changeP)
      ];
    });
  }

  async fetch() {
    const quoteRequests = _.map(this.tickers, ticker =>
      finance.quote({ symbol: ticker, modules: ["price"] })
    );
    return Promise.all(quoteRequests);
  }

  async update() {
    const quotes = await this.fetch();
    const data = this.transformData(quotes);
    this.table.setData({
      headers: ["Ticker", "Price", "Change", "Change %"],
      data: data
    });

    this.table.focus();
    this.screen.render();
  }

  render() {
    this.table = this.grid.set(0, 0, 5, 20, contrib.table, {
      keys: true,
      fg: "white",
      selectedFg: "white",
      selectedBg: "blue",
      interactive: true,
      label: "Securities",
      width: "100%",
      height: "50%",
      border: { type: "line", fg: "cyan" },
      columnSpacing: 5,
      columnWidth: [6, 10, 15, 15]
    });
  }
}

module.exports = SecuritiesTable;

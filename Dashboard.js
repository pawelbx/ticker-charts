const blessed = require("blessed");
const contrib = require("blessed-contrib");
const colors = require("colors/safe");
const _ = require("lodash");
const moment = require("moment");
const SecuritiesTable = require("./SecuritiesTable");

class Dashboard {
  constructor(tickers, isMarketOpen) {
    this.screen = blessed.screen();
    this.grid = new contrib.grid({ rows: 20, cols: 20, screen: this.screen });

    this.securitiesTable = new SecuritiesTable(
      this.screen,
      this.grid,
      tickers,
      isMarketOpen
    );

    this.screen.key(["escape", "q", "C-c"], function(ch, key) {
      return process.exit(0);
    });
  }
}

module.exports = Dashboard;

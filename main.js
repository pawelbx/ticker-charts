const finance = require("yahoo-finance");
const blessed = require("blessed");
const contrib = require("blessed-contrib");

const screen = blessed.screen();
const table = contrib.table({
  keys: true,
  fg: "white",
  selectedFg: "white",
  selectedBg: "blue",
  interactive: true,
  label: "Stocks",
  width: "100%",
  height: "50%",
  border: { type: "line", fg: "cyan" },
  columnSpacing: 0,
  columnWidth: [8, 8, 8, 8]
});

screen.append(table);

table.setData({
  headers: ["Ticker", "Price", "Change", "Change %"],
  data: [["AAPL", 900, 5.32, "0.3%"]]
});

screen.key(["escape", "q", "C-c"], function(ch, key) {
  return process.exit(0);
});

screen.render();

async function main() {
  const quote = await finance.quote({ symbol: "AAPL", modules: ["price"] });
  console.log(quote);
}

main();

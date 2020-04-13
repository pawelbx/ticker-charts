// const finHubApi = require("./FinHub");
// const finance = require("yahoo-finance");
// const blessed = require("blessed");
// const contrib = require("blessed-contrib");
// const colors = require("colors/safe");
// const _ = require("lodash");
// const moment = require("moment");
const Dashboard = require("./Dashboard");

// async function fetchYahoo(tickers) {
//   const quoteRequests = _.map(tickers, ticker =>
//     finance.quote({ symbol: ticker, modules: ["price"] })
//   );
//   const quotes = await Promise.all(quoteRequests);
//   return quotes;
// }

// async function isMarketOpen() {
//   const quote = await finance.quote({ symbol: "^GSPC", modules: ["price"] });
//   return quote.price.marketState != "CLOSED";
// }

// function renderChart(data) {
//   const line = grid.set(10, 0, 10, 20, contrib.line, {
//     width: 50,
//     height: 20,
//     label: "cool",
//     left: 15,
//     top: 20,
//     minY: 0,
//     maxY: 100,
//     style: { line: randomColor(), text: randomColor(), baseline: randomColor() }
//   });
//   line.setData(data);
// }

// async function fetchHistory() {
//   const result = await finance.historical({
//     symbol: "ES=F",
//     from: "2020-04-03",
//     to: "2020-04-06",
//     period: "v"
//   });
//   const x = _.reverse(
//     _.map(result, datum => moment(datum.date).format("YYYY-MM-DD"))
//   );
//   const y = _.reverse(_.map(result, datum => datum.close));

//   return { x: x, y: y };
// }

// function randomColor() {
//   return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
// }

async function main() {
  const tickers = process.argv.slice(2);
  const dashboard = new Dashboard(tickers, false);
  //const quotes = await fetchYahoo(tickers);
  //console.log(quotes);
  //const history = await fetchHistory(tickers);
  //console.log(history);
  // const data = transformTableData(quotes);
  // renderTable(data);
  // renderChart(data);
  // screen.render();
  //await new Promise(resolve => setTimeout(resolve, 1000));

  // const history = await fetchHistory();
  // renderChart(history);
}

main();
//alpha vantage api key = LQTPFM5B8T73N2X1

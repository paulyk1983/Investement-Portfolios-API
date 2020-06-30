var yahooFinance = require('yahoo-finance');
 
const getHistoricalData = async () => {
    yahooFinance.historical({
    symbol: 'AAPL',
    from: '2012-01-01',
    to: '2012-12-31',
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
    console.log(quotes)
    console.log(err)
    });
}

const getQuote = async () => {
    yahooFinance.quote({
        symbol: 'AAPL',
        modules: [ 'summaryDetail' ] // see the docs for the full list
      }, function (err, quotes) {
        console.log(quotes)
    console.log(err)
      });

}
 
// This replaces the deprecated snapshot() API
yahooFinance.quote({
  symbol: 'AAPL',
  modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
}, function (err, quotes) {
  // ...
});

module.exports = { getHistoricalData, getQuote }
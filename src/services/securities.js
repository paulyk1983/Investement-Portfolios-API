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

const getCurrentPrice = async (symbol) => {
    try {
        const quote = await yahooFinance.quote({
            symbol: symbol,
            modules: [ 'summaryDetail' ] // see the docs for the full list
        })
        const currentPrice = quote.summaryDetail.bid
        return currentPrice
    } catch (error) {
        console.log("error on service layer")
        console.log(error)
    }
}


module.exports = { getHistoricalData, getCurrentPrice }
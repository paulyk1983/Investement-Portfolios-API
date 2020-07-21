var yahooFinance = require('yahoo-finance');
 
const getLastHighPrice = async (symbol, startDate) => {
    try {
        const historicalData = await yahooFinance.historical({
            symbol: symbol,
            from: startDate,
            to: '2020-07-04',
            // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
        })

        var peakPrice = 0
        for (i = 0; i < historicalData.length; i++) {
            if (historicalData[i].high > peakPrice) {
                peakPrice = historicalData[i].high
            }
        }

        return peakPrice
    } catch (error) {
        console.log("error on service layer")
        console.log(error)
    }
      
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

const getQuotes = async (symbols) => {
    try {
        const quotes = await yahooFinance.quote({
            symbols: symbols,
            modules: [ 'summaryDetail' ] // see the docs for the full list
        }) 

        return quotes
    } catch (error) {
        console.log("error on service layer")
        console.log(error)
    }
}


module.exports = { getLastHighPrice, getCurrentPrice, getQuotes }
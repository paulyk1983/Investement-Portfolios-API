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

// takes in array of tickers and returns array of quotes which include ticker and currentPrice properties
const getQuotes = async (tickerSymbols) => {
    try {
        const quotesFromYahoo = await yahooFinance.quote({
            symbols: tickerSymbols,
            modules: [ 'summaryDetail' ] // see the docs for the full list
        })
        if (!quotesFromYahoo) {
            throw "Unable to connect to Yahoo Fincance"
        } else {
            var quotes = []     
            for (i = 0; i < tickerSymbols.length; i++) {
                // NOTE: ADDS 'BID' PRICE WHICH MAY NOT BE EXACTLY WHAT IS SEEN IN THE MARKET (OFF BY A FEW POINTS)
                let quote = {
                    "ticker": tickerSymbols[i],
                    "currentPrice": quotesFromYahoo[tickerSymbols[i]].summaryDetail.bid
                }
                    
                quotes.push(quote)
            }
            
            return quotes
        }

    } catch (error) {
        console.log("error on service layer")
        console.log(error)
    }
}

const calculateStopLossPrice = (lastHighPrice, stopLossPercent) => { 
    return (lastHighPrice - (lastHighPrice * (stopLossPercent/100)))
}

const calculateStopLossStatus = (currentPrice, stopLossPrice) => {
    const dangerPercent = 10
    const warningPercent = 25
    const dangerPrice = (stopLossPrice * (dangerPercent/100)) + stopLossPrice
    const warningPrice = (stopLossPrice * (warningPercent/100)) + stopLossPrice

    var stopLossStatus = ""
    if (currentPrice <= stopLossPrice) {
        stopLossStatus = "breached"
    } else if (currentPrice <= dangerPrice) {
        stopLossStatus = "danger"
    } else if (currentPrice <= warningPrice) {
        stopLossStatus = "warning"
    } else {
        stopLossStatus = "active"
    }

    return stopLossStatus
}



module.exports = { getLastHighPrice, getCurrentPrice, getQuotes, calculateStopLossPrice, calculateStopLossStatus }
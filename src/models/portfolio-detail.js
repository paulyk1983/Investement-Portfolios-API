const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { formatDate } = require('../utilities/dates')
const { getQuotes } = require('../services/securities')
const { getLastHighPrice, calculateStopLossPrice, calculateStopLossStatus } = require('../services/securities')
const { holdingReadSchema } = require('./holding-read')


var portfolioDetailsSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    owner: {
        name: String
    },
    holdings: [holdingReadSchema] 
})

// portfolioDetailsSchema.set('toJSON', {
//     transform: function(doc, ret) {
//        ret.id = ret._id
//        delete ret._id
//        delete ret.__v
//        return ret
//     }
//  })


portfolioDetailsSchema.method('transform',  async function() {
    var obj = this.toObject();

    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v

    const holdingTickerSymbols = obj.holdings.map(prop => prop.ticker)
    const quotes = await getQuotes(holdingTickerSymbols)

    // holdings
    for (let i = 0; i < obj.holdings.length; i++) {
        var holding = obj.holdings[i]

        holding.settlementDate = formatDate(holding.settlementDate)
        holding.stopLossStartDate = formatDate(holding.stopLossStartDate)
        holding.currentPrice = quotes.find(quote => quote.ticker = holding.ticker).currentPrice

        const lastHighPrice =  await getLastHighPrice(holding.ticker, holding.stopLossStartDate)
        if (lastHighPrice != holding.lastHighPrice) {
            holding.lastHighPrice = lastHighPrice
            holding.stopLossPrice = calculateStopLossPrice(lastHighPrice, holding.stopLossPercent)
            
            //newLastHighPrice = true
        }

        const stopLossStatus = calculateStopLossStatus(holding.currentPrice, holding.stopLossPrice)
        
        if (stopLossStatus != holding.stopLossStatus) {
            holding.stopLossStatus = stopLossStatus
            //newStopLossStatus == true
        }

        holding.id = holding._id
        delete holding._id
    }
    
    return obj
});



const PortfolioDetails = mongoose.model('PortfolioDetails', portfolioDetailsSchema, 'portfolios')

module.exports = { PortfolioDetails }


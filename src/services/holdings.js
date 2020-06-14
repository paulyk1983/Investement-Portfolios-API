const { HoldingRead } = require('../models/holding-read')
const { HoldingUpdate } = require('../models/holding-update')
const { PortfolioWrite } = require('../models/portfolio-write')
const { PortfolioDetails } = require('../models/portfolio-detail')
const portfolioService = require('./portfolios')


const addHoldingToPortfolio = async (holding, portfolioId) => {
    try {
        const portfolio = await portfolioService.findPortfolioById(portfolioId)
        portfolio.holdings.push(holding)

        const query = {_id:{$eq:portfolioId}}
        const updatedPortfolio = await PortfolioWrite.updateMany(query, portfolio)

        return updatedPortfolio
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}

const findHoldingById = async (portfolioId, holdingId) => {
    try {
        const portfolio = await PortfolioDetails.findById(portfolioId).select('holdings')
        const targetHolding = portfolio.holdings.filter(holding => {
            return holding._id == holdingId
        })
       
        return targetHolding[0]
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}

const updateHoldingById = async (portfolioId, holdingId, holding) => {
    try {
        // GET TARGET HOLDING INDEX FOR QUERY
        var holdingIndex = 0
        var holdingTicker = ""
        const portfolioHoldings = await PortfolioDetails.findById(portfolioId).select('holdings')
        for (i = 0; i < portfolioHoldings.holdings.length; i++) {
            if (portfolioHoldings.holdings[i]._id == holdingId) {
                holdingIndex = i
                holdingTicker = portfolioHoldings.holdings[i].ticker
                break
            }
        }
        
        // BUILD VALUE FOR $set
        holding._id = holdingId
        holding.ticker = holdingTicker
        const holdingStr = JSON.stringify(holding)
        const setQueryKeyString = '{"holdings.'+holdingIndex+'":'+holdingStr+'}'
        const setQuery = JSON.parse(setQueryKeyString)
        
        // UPDATE PORTFOLIO WITH UPDATED HOLDING
        await PortfolioWrite.updateOne( 
            { _id: portfolioId }, 
            { $set: setQuery }
        )
   
        return {}
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}

const deleteHoldingById = async () => {
    try {
        console.log('delete holding')
        return {}
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}


module.exports = { addHoldingToPortfolio, findHoldingById, updateHoldingById, deleteHoldingById }

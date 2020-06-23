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
        const portfolioHoldings = await PortfolioDetails.findById(portfolioId).select('holdings')

        // GET HOLDING'S TICKER
        const targetHoldingTicker = portfolioHoldings.holdings.filter(holding => holding._id == holdingId)[0].ticker
        holding.ticker = targetHoldingTicker

        // UPDATE HOLDINGS ARRAY
        var portfolioHoldingsArray = portfolioHoldings.holdings.filter(holding => holding._id != holdingId)
        portfolioHoldingsArray.push(holding)

        setQuery = { holdings: portfolioHoldingsArray }

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

const deleteHoldingById = async (portfolioId, holdingId) => {
    try {
        const portfolioHoldings = await PortfolioDetails.findById(portfolioId).select('holdings')
        const portfolioHoldingsArray = portfolioHoldings.holdings.filter(holding => holding._id != holdingId);

        setQuery = { holdings: portfolioHoldingsArray }

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


module.exports = { addHoldingToPortfolio, findHoldingById, updateHoldingById, deleteHoldingById }

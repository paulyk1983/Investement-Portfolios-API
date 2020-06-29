const { HoldingRead } = require('../models/holding-read')
const { HoldingUpdate } = require('../models/holding-update')
const { PortfolioWrite } = require('../models/portfolio-write')
const { PortfolioDetails } = require('../models/portfolio-detail')
const portfolioService = require('./portfolios')
const { ErrorResponse } = require('../models/error-response')


const addHoldingToPortfolio = async (holding, portfolioId) => {
    try {
        const portfolio = await portfolioService.findPortfolioById(portfolioId)

        if (portfolio.status && portfolio.status == 404) {
            return portfolio
        } else {
            portfolio.holdings.push(holding)

            const query = {_id:{$eq:portfolioId}}
            const result = await PortfolioWrite.updateOne(query, portfolio)
            return result
        }

        
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
        if (error.kind == "ObjectId") {
            return null
        }
    }  
}

const findHoldingById = async (portfolioId, holdingId) => {
    try {
        const portfolioResult = await portfolioService.findPortfolioById(portfolioId)
        if (portfolioResult.status && portfolioResult.status == 404) {
            
            return portfolioResult
        } else {
            var targetHolding = portfolioResult.holdings.filter(holding => {
                return holding._id == holdingId
            })
            
            if (!targetHolding || targetHolding.length == 0) {
                var noHoldingErrorResponse = new ErrorResponse({
                    status: 404,
                    title: "Not Found",
                    details: "Holding with specified id not found"
                })
                return noHoldingErrorResponse

            } else {
                return targetHolding
            }
            
        }
        
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}

const updateHoldingById = async (portfolioId, holdingId, holding) => {
    try {
        const portfolioResult = await portfolioService.findPortfolioById(portfolioId)
        if (portfolioResult.status && portfolioResult.status == 404) {
            // returns portfolio not found message
            return portfolioResult
        } else {
            // GET HOLDING'S TICKER
            const targetHolding = portfolioResult.holdings.filter(holding => holding._id == holdingId)[0]
            console.log(targetHolding)
            if (!targetHolding) {
                var noHoldingErrorResponse = new ErrorResponse({
                    status: 404,
                    title: "Not Found",
                    details: "Holding with specified id not found"
                })
                return noHoldingErrorResponse
            } else {
                holding.ticker = targetHolding.ticker
                const query = {_id:{$eq:holdingId}}
                const updateHolding = await HoldingUpdate.updateOne({ query, holding})

                return {}
            }
            
        }

        
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

const { PortfolioWrite } = require('../models/portfolio-write')
const { PortfolioDetails } = require('../models/portfolio-detail')
const portfolioService = require('./portfolios')
const { ErrorResponse } = require('../models/error-response')
const { getHistoricalData, getCurrentPrice } = require('../services/securities')


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
            var targetHoldingArray = portfolioResult.holdings.filter(holding => {
                return holding._id == holdingId
            })
            
            if (!targetHoldingArray || targetHoldingArray.length == 0) { 
                return noHoldingErrorResponse()
            } else {
                var targetHolding = targetHoldingArray[0]

                // NOTE: ADDS 'BID' PRICE WHICH MAY NOT BE EXACTLY WHAT IS SEEN IN THE MARKET (OFF BY A FEW POINTS)
                const currentPrice = await getCurrentPrice(targetHolding.ticker)
                targetHolding.currentPrice = currentPrice

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
        const portfolio = await portfolioService.findPortfolioById(portfolioId)
        if (portfolio.status && portfolio.status == 404) {
            // returns portfolio not found message
            return portfolio
        } else {
            // GET HOLDING'S TICKER
            const targetHolding = portfolio.holdings.filter(holding => holding._id == holdingId)[0]
            if (!targetHolding) {
                return noHoldingErrorResponse()
            } else {
                console.log(targetHolding)
                for (const property in holding) {
                    for (const targetProperty in targetHolding) {
                        if (targetProperty == property) {
                            targetHolding[targetProperty] = holding[property]
                        } 
                    }
                }

                // UPDATE PORTFOLIO WITH UPDATED HOLDING
                const query = {_id:{$eq:portfolioId}}
                await PortfolioWrite.updateOne(query, portfolio)

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

const noHoldingErrorResponse = async () => {
    return new ErrorResponse({
        status: 404,
        title: "Not Found",
        details: "Holding with specified id not found"
    })
}


module.exports = { addHoldingToPortfolio, findHoldingById, updateHoldingById, deleteHoldingById }

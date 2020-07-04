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

                if (targetHolding.stopLossPercent) {
                    
                    var newLastHighPrice = false
                    var newStopLossStatus = false

                    // Get lastHighPrice                    
                    if (currentPrice > targetHolding.lastHighPrice) {
                        targetHolding.lastHighPrice == currentPrice
                        newLastHighPrice = true
                    }

                    // Calculate stopLossPrice
                    const lastHighPrice = targetHolding.lastHighPrice
                    const stopLossPrice = (lastHighPrice - (lastHighPrice * (targetHoldoing.stopLossPercent/100)))
                    targetHolding.stopLossPrice = stopLossPrice

                    // Calculate stopLossStatus
                    const dangerPercent = 10
                    const dangerPrice = (stopLossPrice * (dangerPercent/100)) + stopLossPrice
                    const warningPercent = 25
                    const warningPrice = (stopLossPrice * (warningPercent/100)) + stopLossPrice
                    if (currentPrice <= stopLossPrice) {
                        const stopLossStatus = "breached"
                    } else if (currentPrice <= dangerPrice) {
                        const stopLossStatus = "danger"
                    } else if (currentPrice <= warningPrice) {
                        const stopLossStatus = "warning"
                    } else {
                        const stopLossStatus = "active"
                    }

                    if (stopLossStatus != targetHolding.stopLossStatus) {
                        newStopLossStatus = true
                    }

                    if (newLastHighPrice || newStopLossStatus) {
                        // update holding db...
                    }

                    return targetHolding
                } else {
                    return targetHolding
                }

                
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

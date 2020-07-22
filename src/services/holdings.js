const { PortfolioWrite } = require('../models/portfolio-write')
const { PortfolioDetails } = require('../models/portfolio-detail')
const portfolioService = require('./portfolios')
const { ErrorResponse } = require('../models/error-response')
const { getLastHighPrice, getCurrentPrice } = require('../services/securities')
const { formatDate } = require('../helpers/dates')


const addHoldingToPortfolio = async (holding, portfolioId) => {
    try {
        const portfolio = await portfolioService.findPortfolioById(portfolioId)

        if (portfolio.status && portfolio.status == 404) {
            return portfolio
        } else {
            var startDate = "YYYY-MM-DD"
            if (holding.stopLossStartDate) {
                startDate = holding.stopLossStartDate
            } else {
                startDate = holding.settlementDate
            }
            const lastHighPrice = await getLastHighPrice(holding.ticker, startDate)
            holding.lastHighPrice = lastHighPrice

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

                    const stopLossData = calculateHoldingStopLoss(currentPrice, targetHolding.lastHighPrice, targetHolding.stopLossPercent)
                    
                    targetHolding.stopLossPrice = stopLossData.stopLossPrice

                    targetHolding.stopLossStatus = stopLossData.stopLossStatus

                    if (stopLossData.newLastHighPrice) {
                        // update db
                        const query = {_id:{$eq:portfolioId}}
                        const update = {$set: {"lastHighPrice":currentPrice}}
                        await PortfolioWrite.updateOne(query, update)
                        console.log("lastHighPrice updated!")
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

                // check to see if settlement date or stoploss start date changed. If so, update with new lastHighPrice
                if (holding.stopLossStartDate && targetHolding.stopLossStartDate && holding.stopLossStartDate != formatDate(targetHolding.stopLossStartDate)) {
                    const lastHighPrice = await getLastHighPrice(targetHolding.ticker, holding.stopLossStartDate)
                    targetHolding.lastHighPrice = lastHighPrice 
                    console.log("lastHighPrice updated!")       

                } else if (holding.settlementDate != formatDate(targetHolding.settlementDate)) {
                    const lastHighPrice = await getLastHighPrice(targetHolding.ticker, holding.settlementDate)  
                    targetHolding.lastHighPrice = lastHighPrice   
                    console.log("lastHighPrice updated!")     

                }

                // UPDATE HOLDING OBJECT (ALL FIELDS CONTAINED IN REQUEST)
                for (const property in holding) {
                    for (const targetProperty in targetHolding) {
                        if (targetProperty == property) {
                            targetHolding[targetProperty] = holding[property]
                        } 
                    }
                }

                // UPDATE PORTFOLIO DOCUMENT WITH UPDATED HOLDING OBJECT
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

const calculateHoldingStopLoss = (currentPrice, lastHighPrice, stopLossPercent) => {
    // Should return newLastHighPrice(bool), stopLossPrice and stopLossStatus
    var result = {}
    
    // Get lastHighPrice                    
    if (currentPrice > lastHighPrice) {
        lastHighPrice == currentPrice
        result.newLastHighPrice = true
    }

    // Calculate stopLossPrice
    const stopLossPrice = (lastHighPrice - (lastHighPrice * (stopLossPercent/100)))
    result.stopLossPrice = stopLossPrice

    // Calculate stopLossStatus
    const dangerPercent = 10
    const dangerPrice = (stopLossPrice * (dangerPercent/100)) + stopLossPrice
    const warningPercent = 25
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
    result.stopLossStatus = stopLossStatus

    return result
}

const noHoldingErrorResponse = async () => {
    return new ErrorResponse({
        status: 404,
        title: "Not Found",
        details: "Holding with specified id not found"
    })
}


module.exports = { addHoldingToPortfolio, findHoldingById, updateHoldingById, deleteHoldingById }

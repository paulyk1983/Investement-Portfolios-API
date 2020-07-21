const { PortfolioList } = require('../models/portfolio-list')
const { PortfolioWrite } = require('../models/portfolio-write')
const { PortfolioDetails } = require('../models/portfolio-detail')
const { ErrorResponse } = require('../models/error-response')
const { getQuotes } = require('../services/securities')


const findAllPortfolios = async () => {
    try {
        const portfolios = await PortfolioList.find().select('-holdings')

        return portfolios
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }
    
}

const createPortfolio = async (req) => {
    try {
        const newPortfolio = await PortfolioWrite.insertMany(req)

        return newPortfolio
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }
}

const findPortfolioById = async (portfolioId) => {
    try {
        const portfolio = await PortfolioDetails.findById(portfolioId)
        if (!portfolio) {
            return noPortfolioErrorResponse()
        } else {
            var holdings = portfolio.holdings
            
            if (holdings.length) {
                const holdingTickerSymbols = holdings.map(obj => obj.ticker)
                const quotes = await getQuotes(holdingTickerSymbols)
                for (i = 0; i < holdings.length; i++) {
                    // NOTE: ADDS 'BID' PRICE WHICH MAY NOT BE EXACTLY WHAT IS SEEN IN THE MARKET (OFF BY A FEW POINTS)
                    holdings[i].currentPrice = quotes[holdings[i].ticker].summaryDetail.bid
                }
                // TODO use current prices to calculate stoploss price, use stoploss price to calculate stoploss status!!!

                return portfolio 
            } else {
                return portfolio 
            } 
        }
           
    } catch (error) {
        
        console.log("Error on service layer")
        console.log(error)
        if (error.kind == "ObjectId") {
            return noPortfolioErrorResponse()
        }
    }
}

const updatePortfolioById = async (portfolio, id) => {
    try {
        const query = {_id:{$eq:id}}
        const updatedPortfolio = await PortfolioWrite.updateOne(query, portfolio)
        if (updatedPortfolio.n == 0 && updatedPortfolio.nModified == 0) {
            return noPortfolioErrorResponse()
        }
        return updatedPortfolio
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
        if (error.kind == "ObjectId") {
            return noPortfolioErrorResponse()
        }
    }
    
}

const deletePortfolioById = async (portfolioId) => {
    try {
        await PortfolioList.findByIdAndDelete(portfolioId)
        return {}
    } catch (error) {
        console.log("Error on service layer")
        if (error.kind == "ObjectId") {
            return {}
        }
    }
}

const noPortfolioErrorResponse = () => {
    return new ErrorResponse({
        status: 404,
        title: "Not Found",
        details: "Portfolio with specified id not found"
    })
}


module.exports = { findAllPortfolios, createPortfolio, findPortfolioById, deletePortfolioById, updatePortfolioById }
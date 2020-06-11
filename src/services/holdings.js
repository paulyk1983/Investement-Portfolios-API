const { HoldingRead } = require('../models/holding-read')
const { HoldingUpdate } = require('../models/holding-update')
const { PortfolioWrite } = require('../models/portfolio-write')
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

const findHoldingById = async () => {
    try {
        console.log('find holding by id')
        return {}
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}

const updateHoldingById = async () => {
    try {
        console.log('update holding')
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

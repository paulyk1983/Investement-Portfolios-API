const { PortfolioList } = require('../models/portfolio-list')
const { PortfolioWrite } = require('../models/portfolio-write')


const findAllPortfolios = async () => {
    const portfolios = await PortfolioList.find()

    return portfolios
}

const createPortfolio = async () => {
    const testPortfolio = {
        name: "test port",
        description: "test descfiption yayadada",
        owner: {
            name: "Paul"
        }
    }
    const newPortfolio = await PortfolioWrite.insertMany(testPortfolio)

    return newPortfolio
}

module.exports = { findAllPortfolios, createPortfolio }
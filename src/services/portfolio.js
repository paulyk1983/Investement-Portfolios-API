const { PortfolioList } = require('../models/portfolio-list')
const { PortfolioWrite } = require('../models/portfolio-write')


const findAllPortfolios = async () => {
    const portfolios = await PortfolioList.find()

    return portfolios
}

const createPortfolio = async (req) => {
    const newPortfolio = await PortfolioWrite.insertMany(req)

    return newPortfolio
}

module.exports = { findAllPortfolios, createPortfolio }
const { PortfolioList } = require('../models/portfolio-list')
const { PortfolioWrite } = require('../models/portfolio-write')


const findAllPortfolios = async () => {
    try {
        const portfolios = await PortfolioList.find()

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

module.exports = { findAllPortfolios, createPortfolio }
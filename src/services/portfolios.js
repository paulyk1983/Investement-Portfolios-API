const { PortfolioList } = require('../models/portfolio-list')
const { PortfolioWrite } = require('../models/portfolio-write')
const { PortfolioDetails } = require('../models/portfolio-detail')


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
        
        return portfolio    
    } catch (error) {
        
        console.log("Error on service layer")
        console.log(error)
        if (error.kind == "ObjectId") {
            return null
        }
    }
}

const updatePortfolioById = async (portfolio, id) => {
    try {
        const query = {_id:{$eq:id}}
        const updatedPortfolio = await PortfolioWrite.updateMany(query, portfolio)
        
        return updatedPortfolio
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }
    
}

const deletePortfolioById = async (portfolioId) => {
    try {
        await PortfolioList.findByIdAndDelete(portfolioId)
        return {}
    } catch (error) {
        console.log("Error on service layer")
    }
}


module.exports = { findAllPortfolios, createPortfolio, findPortfolioById, deletePortfolioById, updatePortfolioById }
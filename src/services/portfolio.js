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

const findPortfolioById = async (portfolioId) => {
    try {
        const portfolio = await PortfolioList.findById(portfolioId)

        if (!portfolio) {
            return notFoundErrorMessage(portfolioId)
        } else {
            return portfolio
        }
          
    } catch (error) {
        
        console.log("Error on service layer")
        if (error.kind == "ObjectId") {
            return notFoundErrorMessage(portfolioId)
        }
    }
}

const updatePortfolioById = async (portfolio, id) => {
    try {
        const query = {_id:{$eq:id}}
        const result = await PortfolioWrite.updateMany(query, portfolio)
        
        return result
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

const notFoundErrorMessage = (id) => {
    return {"status":404, "title":"Not Found", "details":"Portfolio with Id " + id + " cannot be found"}
}

module.exports = { findAllPortfolios, createPortfolio, findPortfolioById, deletePortfolioById, updatePortfolioById }
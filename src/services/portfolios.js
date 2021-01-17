const { PortfolioList } = require('../models/portfolio-list')
const { PortfolioWrite } = require('../models/portfolio-write')
const { PortfolioDetails } = require('../models/portfolio-detail')
const { ErrorResponse } = require('../models/error-response')


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
        var originalPortfolio = await PortfolioDetails.findById(portfolioId)
        
        if (!originalPortfolio) {
            return noPortfolioErrorResponse()
        } else {
            const upToDatePortfolio = originalPortfolio.transform()

            if (upToDatePortfolio.lastHighPrice != upToDatePortfolio.lastHighPrice || upToDatePortfolio.stopLossStatus != upToDatePortfolio.stopLossStatus) {
                // Update portfolio database
            }

            return upToDatePortfolio
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
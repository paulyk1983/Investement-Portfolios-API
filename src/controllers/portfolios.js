const {findAllPortfolios, createPortfolio, findPortfolioById} = require('../services/portfolio')


const getPortfolios = async (req, res) => {
    try {
        const portfolios = await findAllPortfolios()

        res.status(200).json(portfolios)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
    
}

const postPortfolios = async (req, res) => {
    try {
        const newPortfolio = await createPortfolio(req)
        const portfolioId = newPortfolio[0]._id

        res.status(201).json({id:portfolioId})
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
    
}

const getPortfolioById = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        
        const portfolio = await findPortfolioById(portfolioId)
       
        res.status(200).json(portfolio)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}
//
module.exports = {getPortfolios, postPortfolios, getPortfolioById}
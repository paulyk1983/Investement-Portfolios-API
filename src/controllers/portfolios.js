const {findAllPortfolios, createPortfolio, findPortfolioById, deletePortfolioById} = require('../services/portfolio')


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

const getPortfolio = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        
        const result = await findPortfolioById(portfolioId)

        if (result.status == 404) {
            res.status(404).json(result)
        } else {
            res.status(200).json(portfolio)
        }
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}

const deletePortfolio = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        
        const result = await deletePortfolioById(portfolioId)
        
        if (result.status == 404) {
            res.status(404).json(result)
        } else {
            res.sendStatus(204)
        }
       
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}

module.exports = {getPortfolios, postPortfolios, getPortfolio, deletePortfolio}
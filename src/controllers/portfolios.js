const { findAllPortfolios, createPortfolio, findPortfolioById, deletePortfolioById, updatePortfolioById } = require('../services/portfolio')


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
        
        const portfolio = await findPortfolioById(portfolioId)

        if (portfolio.status == 404) {
            res.status(404).json(portfolio)
        } else {
            res.status(200).json(portfolio)
        }
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}

const updatePortfolio = async (req, res) => {
    try {
        const portfolio = await updatePortfolioById(req.body, req.params.portfolioId)
        
        if (portfolio) {
            res.sendStatus(204)
        } else {
            res.status(404).json(notFoundErrorMessage())
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

        res.sendStatus(204)
       
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}

const notFoundErrorMessage = () => {
    return {"status":404, "title":"Not Found", "details":"Portfolio with the specified id cannot be found"}
}

module.exports = { getPortfolios, postPortfolios, getPortfolio, deletePortfolio, updatePortfolio }
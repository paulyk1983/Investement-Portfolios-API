const {findAllPortfolios, createPortfolio} = require('../services/portfolio')


const getPortfolios = async (req, res) => {

    const portfolios = await findAllPortfolios()

    res.status(200).json(portfolios)
}

const postPortfolios = async (req, res) => {
    
    const newPortfolio = await createPortfolio()
    const portfolioId = newPortfolio[0]._id
    
    res.status(201).json({id:portfolioId})
}

module.exports = {getPortfolios, postPortfolios}
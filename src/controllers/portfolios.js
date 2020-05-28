const {findAllPortfolios, createPortfolio} = require('../services/portfolio')


const getPortfolios = async (req, res) => {

    const portfolios = await findAllPortfolios()

    res.status(200).json(portfolios)
}

const postPortfolios = async (requestBody, res) => {

    const newPortfolio = await createPortfolio(requestBody)
    const portfolioId = newPortfolio[0]._id

    res.status(201).json({id:portfolioId})
}

module.exports = {getPortfolios, postPortfolios}
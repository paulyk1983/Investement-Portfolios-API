const {findAllPortfolios, createPortfolio} = require('../services/portfolio')


const getPortfolios = async (req, res) => {
    try {
        const portfolios = await findAllPortfolios()

        res.status(200).json(portfolios)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
    
}

const postPortfolios = async (requestBody, res) => {
    try {
        const newPortfolio = await createPortfolio(requestBody)
        //const portfolioId = newPortfolio[0]._id
        const portfolioId = "test"

        res.status(201).json({id:portfolioId})
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
    
}

module.exports = {getPortfolios, postPortfolios}
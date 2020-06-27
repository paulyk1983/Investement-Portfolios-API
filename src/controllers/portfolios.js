const { findAllPortfolios, createPortfolio, findPortfolioById, deletePortfolioById, updatePortfolioById } = require('../services/portfolios')


const getPortfolios = async (req, res) => {
    try {
        const portfolios = await findAllPortfolios()
        const response = {data:portfolios}

        res.status(200).json(response)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
        res.sendStatus(500)
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
        res.sendStatus(500)
    }  
}

const getPortfolio = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        
        const result = await findPortfolioById(portfolioId)
        
        if (result.status && result.status == 404) {
            res.status(404).json(result)
        } else {
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
        res.sendStatus(500)
    }
}

const updatePortfolio = async (req, res) => {
    try {
        const result = await updatePortfolioById(req.body, req.params.portfolioId)

        if (result.status && result.status == 404) {
            res.status(404).json(result)            
        } else {
            res.sendStatus(204)
        }
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
        res.sendStatus(500)
    }
}

const deletePortfolio = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId 
        await deletePortfolioById(portfolioId)
        
        res.sendStatus(204)
       
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
        res.sendStatus(500)
    }
}

const portfolioNotFoundMessage = () => {
    return {"status":404, "title":"Not Found", "details":"Portfolio with the specified id cannot be found"}
}

module.exports = { getPortfolios, postPortfolios, getPortfolio, deletePortfolio, updatePortfolio, portfolioNotFoundMessage }
const { addHoldingToPortfolio, findHoldingById, updateHoldingById, deleteHoldingById } = require('../services/holdings')

const postHoldings = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        const result = await addHoldingToPortfolio(req.body, portfolioId)
       
        res.status(201).json(result)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }  
}

const getHolding = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        const holdingId = req.params.holdingId
        const holding = await findHoldingById(portfolioId, holdingId)

        res.status(200).json(holding)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}

const updateHolding = async (req, res) => {
    try {
        const holding = req.body
        const portfolioId = req.params.portfolioId
        const holdingId = req.params.holdingId

        await updateHoldingById(portfolioId, holdingId, holding)

        res.sendStatus(204)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}

const deleteHolding = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        const holdingId = req.params.holdingId

        const result = await deleteHoldingById(portfolioId, holdingId)
        
        res.sendStatus(204)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}


module.exports = { postHoldings, getHolding, updateHolding, deleteHolding }
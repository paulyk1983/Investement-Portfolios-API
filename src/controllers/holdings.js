const { addHoldingToPortfolio, findHoldingById, updateHoldingById, deleteHoldingById } = require('../services/holdings')

const postHoldings = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        const result = await addHoldingToPortfolio(req.body, portfolioId)

        if (result.status && result.status == 404) {
            res.status(404).json(result)
        } else {
            res.sendStatus(201)
        }
       
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }  
}

const getHolding = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId
        const holdingId = req.params.holdingId
        const result = await findHoldingById(portfolioId, holdingId)
        
        if (result.status && result.status == 404) {
            res.status(404).json(result)
        } else {
            res.status(200).json(result)
        }

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

        const result = await updateHoldingById(portfolioId, holdingId, holding)

        if (result.status && result.status == 404) {
            res.status(404).json(result)
        } else {
            res.status(204).json(result)
        }
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
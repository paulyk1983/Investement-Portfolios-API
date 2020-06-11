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
        const holding = await findHoldingById(req)
        res.sendStatus(200)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}

const updateHolding = async (req, res) => {
    try {
        const result = await updateHoldingById()
        res.sendStatus(204)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}

const deleteHolding = async (req, res) => {
    try {
        const result = await deleteHoldingById()
        res.sendStatus(204)
    } catch (error) {
        console.log("Error on controller layer")
        console.log(error)
    }
}


module.exports = { postHoldings, getHolding, updateHolding, deleteHolding }
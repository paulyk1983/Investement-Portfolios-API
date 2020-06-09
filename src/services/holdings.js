const { HoldingCreate } = require('../models/holding-create')
const { HoldingRead } = require('../models/holding-read')
const { HoldingUpdate } = require('../models/holding-update')

const createHolding = async () => {
    try {
        console.log('create holding')
        return {}
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}

const findHoldingById = async () => {
    try {
        console.log('find holding by id')
        return {}
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}

const updateHoldingById = async () => {
    try {
        console.log('update holding')
        return {}
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}

const deleteHoldingById = async () => {
    try {
        console.log('delete holding')
        return {}
    } catch (error) {
        console.log("Error on service layer")
        console.log(error)
    }  
}


module.exports = { createHolding, findHoldingById, updateHoldingById, deleteHoldingById }

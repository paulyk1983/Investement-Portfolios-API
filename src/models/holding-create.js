const mongoose = require('mongoose')
const Schema = mongoose.Schema

var holdingCreateSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    ticker: {
        type: String
    },
    quantity: {
        type: Number
    },
    stopLossType: {
        type: String,
        enum: ['trailing', 'hard']
    },
    stopLossPercent: {
        type: Number
    },
    stopLossPrice: {
        type: Number
    },
    notes: {
        type: String
    },
    price: {
        type: Number
    }
})


const HoldingCreate = mongoose.model('HoldingCreate', holdingCreateSchema, 'holdings')

module.exports = { HoldingCreate }
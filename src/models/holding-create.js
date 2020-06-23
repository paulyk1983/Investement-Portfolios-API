const mongoose = require('mongoose')
const Schema = mongoose.Schema

var holdingCreateSchema = new Schema({
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
    notes: {
        type: String
    },
    buyPrice: {
        type: Number
    },
    settlementDate: {
        type: Date
    }
})


module.exports = { holdingCreateSchema }
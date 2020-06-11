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
    price: {
        type: Number
    }
})


module.exports = { holdingCreateSchema }
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var holdingUpdateSchema = new Schema({
    name: {
        type: String
    },
    description: {
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


const HoldingUpdate = mongoose.model('HoldingUpdate', holdingUpdateSchema, 'holdings')

module.exports = { HoldingUpdate }
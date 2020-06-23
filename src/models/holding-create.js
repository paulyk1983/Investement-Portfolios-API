const mongoose = require('mongoose')
const Schema = mongoose.Schema

var holdingCreateSchema = new Schema({
    ticker: {
        type: String,
        required: true,
        maxlength: 5
    },
    quantity: {
        type: Number,
        required: true
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
        type: Number,
        required: true
    },
    settlementDate: {
        type: Date,
        required: true
    }
})


module.exports = { holdingCreateSchema }
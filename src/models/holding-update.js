const mongoose = require('mongoose')
const Schema = mongoose.Schema

var holdingUpdateSchema = new Schema({
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
    stopLossStartDate: {
        type: Date
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


const HoldingUpdate = mongoose.model('HoldingUpdate', holdingUpdateSchema, 'holdings')

module.exports = { HoldingUpdate }
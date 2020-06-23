const mongoose = require('mongoose')
const Schema = mongoose.Schema

var holdingUpdateSchema = new Schema({
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
    },
    stopLossPrice: {
        type: Number
    },
    stopLossStatus: {
        type: String,
        enum: ['active','inactive','warning','danger','breached']
    },
    currentPrice: {
        type: Number,
    },
    totalValue: {
        type: Number
    }
})


const HoldingUpdate = mongoose.model('HoldingUpdate', holdingUpdateSchema, 'holdings')

module.exports = { HoldingUpdate }
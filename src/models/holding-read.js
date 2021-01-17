const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { formatDate } = require('../utilities/dates')
const { getCurrentPrice } = require('../services/securities')


var holdingReadSchema = new Schema({
    id: {
        type: String,
        default: null
    },
    name: {
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
    stopLossStartDate: {
        type: Date
    },
    stopLossStatus: {
        type: String,
        enum: ["active", "inactive", "warning", "danger", "breached"] 
    },
    notes: {
        type: String
    },
    buyPrice: {
        type: Number
    },
    lastHighPrice: {
        type: Number
    },
    settlementDate: {
        type: Date
    },
    currentPrice: {
        type: Number,
        default: null
    }
})

// default: function() {
//     return getCurrentPrice(this.ticker)
// }

const HoldingRead = mongoose.model('HoldingRead', holdingReadSchema, 'holdings')

module.exports = { holdingReadSchema, HoldingRead }
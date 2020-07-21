const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { formatDate } = require('../helpers/dates')

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
        enum: ["active, inactive, warning, danger, breached"] 
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
        type: Number
    }
})

holdingReadSchema.set('toJSON', {
    transform: function(doc, ret) {
       ret.id = ret._id
       ret.settlementDate = formatDate(ret.settlementDate)
       ret.stopLossStartDate = formatDate(ret.stopLossStartDate)
       delete ret._id
       delete ret.__v
       return ret
    }
 })


const HoldingRead = mongoose.model('HoldingRead', holdingReadSchema, 'holdings')

module.exports = { holdingReadSchema, HoldingRead }
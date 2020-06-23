const mongoose = require('mongoose')
const Schema = mongoose.Schema

var holdingReadSchema = new Schema({
    id: {
        type: String,
        default: null
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
    buyPrice: {
        type: Number
    },
    settlementDate: {
        type: Date
    }
})

holdingReadSchema.set('toJSON', {
    transform: function(doc, ret) {
       ret.id = ret._id
       delete ret._id
       delete ret.__v
       return ret
    }
 })


const HoldingRead = mongoose.model('HoldingRead', holdingReadSchema, 'holdings')

module.exports = { holdingReadSchema, HoldingRead }
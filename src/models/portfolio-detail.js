const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { holdingReadSchema } = require('./holding-read')


var portfolioDetailsSchema = new Schema({
    id: {
        type: String,
        default: null
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    owner: {
        name: String
    },
    holdings: [holdingReadSchema] 
})

portfolioDetailsSchema.set('toJSON', {
    transform: function(doc, ret) {
       ret.id = ret._id
       delete ret._id
       delete ret.__v
       return ret
    }
 })

const PortfolioDetails = mongoose.model('PortfolioDetails', portfolioDetailsSchema, 'portfolios')

module.exports = { PortfolioDetails }


const mongoose = require('mongoose')
const Schema = mongoose.Schema

var portfolioListSchema = new Schema({
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
    }
})

portfolioListSchema.set('toJSON', {
    transform: function(doc, ret) {
       ret.id = ret._id
       delete ret._id
       delete ret.__v
       return ret
    }
 })


const PortfolioList = mongoose.model('PortfolioList', portfolioListSchema, 'portfolios')

module.exports = { PortfolioList }
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { holdingCreateSchema } = require('./holding-create')

var portfolioWriteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: Object,
        required: true,
        properties: {
            name:{
                type: String,
                required: true
            }
        }
    },
    holdings: [holdingCreateSchema]
});

const PortfolioWrite = mongoose.model('PortfolioWrite', portfolioWriteSchema, 'portfolios')

module.exports = { PortfolioWrite }
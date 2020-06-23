const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { holdingCreateSchema } = require('./holding-create')

var portfolioWriteSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    owner: {
        type: Object,
        required: true,
        properties: {
            name:{
                type: String,
                required: true,
                maxlength: 100
            }
        }
    },
    holdings: [holdingCreateSchema]
});

const PortfolioWrite = mongoose.model('PortfolioWrite', portfolioWriteSchema, 'portfolios')

module.exports = { PortfolioWrite }
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var portfolioWriteSchema = new Schema({
    name: {
        type: String
    },
    description: {
        tyep: String,
    },
    owner: {
        name: {
            type: String
        }
    }
});

const PortfolioWrite = mongoose.model('PortfolioWrite', portfolioWriteSchema, 'portfolios')

module.exports = { PortfolioWrite }
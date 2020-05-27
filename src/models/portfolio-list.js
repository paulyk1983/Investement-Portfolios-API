const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const portfolioListSchema = new Schema({
    id: String,
    name: String,
    description: String,
    owner: {
        name: String
    }
});

const PortfolioList = mongoose.model('PortfolioList', portfolioListSchema);

module.exports = {PortfolioList}
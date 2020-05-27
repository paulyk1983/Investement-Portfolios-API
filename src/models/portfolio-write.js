const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const portfolioWriteSchema = new Schema({
    name: String,
    description: String,
    owner: {
        name: String
    }
});

const PortfolioWrite = mongoose.model('PortfolioWrite', portfolioWriteSchema);

module.exports = {PortfolioWrite}
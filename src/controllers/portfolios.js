const { PortfolioList } = require('../models/portfolio-list')
const { PortfolioWrite } = require('../models/portfolio-write')

const getPortfolios = async (req, res) => {
    res.send("PortfolioList")
}

const postPortfolios = async (req, res) => {
    res.send("PortfolioWrite")
}

module.exports = {getPortfolios, postPortfolios}
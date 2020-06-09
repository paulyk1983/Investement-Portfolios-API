var express = require('express')
var router = express.Router()
var portfoliosController = require('../controllers/portfolios')
var holdingsController = require('../controllers/holdings')

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// PORTFOLIOS:
router.get('/portfolios', function (req, res) {
    portfoliosController.getPortfolios(req, res)
})

router.post('/portfolios', function (req, res) {
    portfoliosController.postPortfolios(req.body, res)
})

router.get('/portfolios/:portfolioId', function (req, res) {
    portfoliosController.getPortfolio(req, res)
})

router.put('/portfolios/:portfolioId', function (req, res) {
    portfoliosController.updatePortfolio(req, res)
})

router.delete('/portfolios/:portfolioId', function (req, res) {
    portfoliosController.deletePortfolio(req, res)
})


// HOLDINGS:
router.post('/portfolios/:portfolioId/holdings', function (req, res) {
    holdingsController.postHoldings(req, res)
})

router.get('/portfolios/:portfolioId/holdings/:holdingId', function (req, res) {
    holdingsController.getHolding(req, res)
})

router.put('/portfolios/:portfolioId/holdings/:holdingId', function (req, res) {
    holdingsController.updateHolding(req, res)
})

router.delete('/portfolios/:portfolioId/holdings/:holdingId', function (req, res) {
    holdingsController.deleteHolding(req, res)
})


module.exports = router
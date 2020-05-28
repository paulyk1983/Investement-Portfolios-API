var express = require('express')
var router = express.Router()
var portfoliosController = require('../controllers/portfolios.js')

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
    res.send('get portfolio by id')
})

router.put('/portfolios/:portfolioId:', function (req, res) {
    res.send('Update a portfolio')
})

router.delete('/portfolios/:portfolioId', function (req, res) {
    res.send('Delete a portfolio')
})


// HOLDINGS:
router.post('/portfolios/:portfolioId/holdings', function (req, res) {
    res.send('adds a holding')
})

router.get('/portfolios/:portfolioId/holdings/:holdingId', function (req, res) {
    res.send('get holdings details')
})

router.put('/portfolios/:portfolioId/holdings/:holdingId', function (req, res) {
    res.send('update holdings details')
})

router.delete('/portfolios/:portfolioId/holdings/:holdingId', function (req, res) {
    res.send('deletes holding')
})


module.exports = router
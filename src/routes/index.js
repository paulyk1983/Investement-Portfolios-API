var express = require('express')
var router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// PORTFOLIOS:
router.get('/portfolios', function (req, res) {
    res.send('list of portfolios')
})

router.post('/portfolios', function (req, res) {
    res.send('Create a portfolio')
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
require('dotenv').config()
var expect = require('chai').expect
const { getCurrentPrice, getLastHighPrice, getQuotes, calculateStopLossStatus } = require('../../src/services/securities')


describe('getCurrentPrice', function() {
    it('should return the currentPrice given a valid ticker symbol', async function() {
        const currentPrice = await getCurrentPrice("DOCU")
      
        expect(currentPrice).to.be.a('number').greaterThan(0)
    })
})

describe('getLastHighPrice', function() {
    it('should return the last high price of given a valid ticker symbol since the given start date', async function() {
        const lastHighPrice = await getLastHighPrice("DOCU")
      
        expect(lastHighPrice).to.be.a('number').greaterThan(0)
    })
})

describe('getQuotes', function() {
    it('should return a list of quotes that include current price for each ticker symbol given', async function() {
        const quotes = await getQuotes(["DOCU", "SPOT"])
     
        expect(quotes).to.be.a('Array')
        expect(quotes[0].ticker).to.equal("DOCU")
        expect(quotes[1].ticker).to.equal("SPOT")
        expect(quotes[0].currentPrice).to.be.a('number').greaterThan(0)
        expect(quotes[1].currentPrice).to.be.a('number').greaterThan(0)
    })
})

describe('calculateStopLossStatus', function() {
    it('should return status of "active"', async function() {
        const status = calculateStopLossStatus(100, 10)

        expect(status).to.equal("active")
    })
    it('should return status of "warning"', async function() {
        const status = calculateStopLossStatus(12, 10)

        expect(status).to.equal("warning")
    })
    it('should return status of "danger"', async function() {
        const status = calculateStopLossStatus(11, 10)

        expect(status).to.equal("danger")
    })
    it('should return status of "breached"', async function() {
        const status = calculateStopLossStatus(9, 10)

        expect(status).to.equal("breached")
    })
})

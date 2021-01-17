require('dotenv').config()
var expect = require('chai').expect
const { Test } = require('../../src/models/stop-loss')

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            expect([1,2,3].indexOf(4)).to.equal(-1)
        })
    })
})

describe('test model functionality', function() {
    it('should return the sum of test1 and test2 fields', function() {
        var stopLossObject = new Test({test2:2})

        expect(stopLossObject.test3).to.equal(3)
    })
})

// describe('portfolio-details model', function() {
//     it('should return the currentPrice', function() {
//       var portfolioInstance = new PortfolioDetails({holdings:[{ticker:"DOCU"}]})
//       console.log("portfolioInstance")
//       console.log(portfolioInstance)
//       expect(portfolioInstance.holdings[0].currentPrice).to.be.a('number');
//     })
// })

require('dotenv').config()
const mongoose = require('mongoose')
var expect = require('chai').expect
const { PortfolioList } = require('../../src/models/portfolio-list')
const { createPortfolio, findAllPortfolios, findPortfolioById } = require('../../src/services/portfolios')
const { mockPortfolios } = require('../data/mock-portfolios')
var portfolioId = null
var portfolio = null


before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_TEST_CONNECTION_STRING, { useUnifiedTopology: true })
        .then(() => done())
})

//After all tests are finished drop database and close connection
after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });

// afterEach(function(done) {
//   database.dropDatabase().then(function() {}).then(done, done);
// });

describe('createPortfolio', function() {
    it('should add a portfolio to the database', async function() {
        const portfolioToCreate = mockPortfolios[0]
        const createPortfolioResult = await createPortfolio(portfolioToCreate)
        portfolioId = createPortfolioResult[0]._id
     
        expect(createPortfolioResult[0].name).to.equal("test portfolio 1")
    })
})

describe('Mongoose', function() {
    it('should get all portfolios', async function() {
        var portfolios = await PortfolioList.find()
        
        expect(portfolios.length).to.be.greaterThan(0)   
    })
})

describe('findAllPortfolios', function() {
    it('should get all portfolios', async function() {
        const portfolios = await findAllPortfolios()

        expect(portfolios.length).to.be.greaterThan(0) 
        expect(portfolios[0].name).to.equal("test portfolio 1")  
    })
})

describe('findPortfolioById', function() {

    it('should retrieve portfolio data inputed by the user', async function() {
        
        portfolio = await findPortfolioById(portfolioId)
        const holding = portfolio.holdings[0]
        
        expect(portfolio.name).to.equal("test portfolio 1")
        expect(holding.ticker).to.equal("AXS")
        expect(holding.quantity).to.equal(12)
        expect(holding.stopLossType).to.equal("trailing")
        expect(holding.stopLossPercent).to.equal(25)
        expect(holding.notes).to.equal("testing123")
        expect(holding.buyPrice).to.equal(160.53)
        expect(holding.settlementDate).to.equal("2020-01-01")
        expect(holding.stopLossStartDate).to.equal("2020-04-01") 
    })
    it('should return server-generated data', function() {
        const holding = portfolio.holdings[0]
        //console.log(holding)
        expect(portfolio.id).to.be.a('string')
        expect(holding.currentPrice).to.be.a('number').greaterThan(0)
        expect(holding.lastHighPrice).to.be.a('number').greaterThan(0)
        expect(holding.stopLossPrice).to.be.a('number').greaterThan(0)
        expect(holding.stopLossStatus).to.be.oneOf(["active", "inactive", "warning", "danger", "breached"]);
    })
})

//TODO: add mock portfolio, then get mock portfolio. Mock values  for holding updates.




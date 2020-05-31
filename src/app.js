const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./routes/index.js')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const environment = process.env.NODE_ENV

const port = process.env.PORT || 3000

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useUnifiedTopology: true,
})

// GET PRODUCTION ERROR WHEN SETTING  useNewURLParser TO TRUE: TypeError: Cannot read property 'map' of undefined
// mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Welcome!!'))

app.use('/', route)

app.listen(port, () => console.log(`App listening at http://localhost:${port} on ` + environment + ` environment`))

module.exports = app
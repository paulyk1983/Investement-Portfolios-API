const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/index.js')

app.get('/', (req, res) => res.send('Welcome!!'))

app.use('/', route)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
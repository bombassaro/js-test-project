const http = require('http')
const express = require('express')
const parser = require('body-parser')
const router = express.Router()
const app = express()

const hotelList = require('./hotels.json')
const bookMethod = require('./bookMethod')

router.get('/hotels', (req, res) => {
  res.status(200).json(hotelList)
})

router.post('/book', bookMethod)

app.use(parser.json())
// app.use(parser.urlencoded)
app.use('/api', router)

http.createServer(app).listen(3000, () => {
  console.log(`Operando na porta 3000`)
})

module.exports = app
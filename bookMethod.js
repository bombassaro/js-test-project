const {map, orderBy} = require('lodash')
const {isWeekend} = require('date-fns')
const hotelList = require('./hotels.json')

const types = require('./types')

const verifiyIfIsWeekend = (book) => {
  const _date = book.split("-")
  const date = new Date(_date[2], _date[1] - 1, _date[0])
  return isWeekend(date)
}

const bookMethod = (req, res) => {
  const {body} = req
  const {books, customer} = body
  //
  const priceTable = []
  //
  map(hotelList, (hotel) => {
    const {name, stars, regularWeek, premiumWeek, regularWeekend, premiumWeekend} = hotel
    let price = 0
    map(books, (book) => {
      const isWeekend = verifiyIfIsWeekend(book)
      // week & regular
      if(!isWeekend && customer === types.BOOK_REGULAR) {
        price = price + regularWeek
      // weekend & regular
      } else if(isWeekend && customer === types.BOOK_REGULAR) {
        price = price + regularWeekend
      // week & premium
      } else if(!isWeekend && customer === types.BOOK_PREMIUM) {
        price = price + premiumWeek
      // weekend & premium
      } else if(isWeekend && customer === types.BOOK_PREMIUM) {
        price = price + premiumWeekend
      }
    })
    priceTable.push({
      name, stars, price
    })
  })
  // ordenar price asc, stars desc
  let orderedList = orderBy(priceTable, ['price', 'stars'], ['asc', 'desc'])

  console.log(`lista ordenada`, orderedList)
  // orderedList[0]
  return res.status(200).json(orderedList[0])
}

module.exports = bookMethod
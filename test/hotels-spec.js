const chai = require('chai')
const chaiHttp = require('chai-http')

const {expect} = chai
chai.use(chaiHttp)

const types = require('../types')
const root = 'http://localhost:3000'

describe('Hotel tests', () => {

  it('List hotels', (done) => {
    chai.request(root)
      .get('/api/hotels')
      .end((err, res) => {
        //
        expect(res.status).to.be.eq(200)
        expect(res.body).to.be.a('array')
        done()
      })
  })

  it('Cenario1 regular/parquedasflores', (done) => {
    chai.request(root)
      .post('/api/book')
      .send({
        "books": ["16-03-2020", "17-03-2020", "18-03-2020"],
        "customer": types.BOOK_REGULAR
      })
      .end((err, res) => {
        expect(res.status).to.be.eq(200)
        expect(res.body).to.be.a('object')
        expect(res.body.name).to.be.eq('Parque das flores')
        done()
      })
  })

  it('Cenario2 regular/jardim botanico', (done) => {
    chai.request(root)
      .post('/api/book')
      .send({
        "books": ["20-03-2020", "21-03-2020", "22-03-2020"],
        "customer": types.BOOK_REGULAR
      })
      .end((err, res) => {
        expect(res.status).to.be.eq(200)
        expect(res.body).to.be.a('object')
        expect(res.body.name).to.be.eq('Jardim Botânico')
        done()
      })
  })

  it('Cenario3 premium/Mar Atlântico', (done) => {
    chai.request(root)
      .post('/api/book')
      .send({
        "books": ["26-03-2020", "27-03-2020", "28-03-2020"],
        "customer": types.BOOK_PREMIUM
      })
      .end((err, res) => {
        expect(res.status).to.be.eq(200)
        expect(res.body).to.be.a('object')
        expect(res.body.name).to.be.eq('Mar Atlântico')
        done()
      })
  })

})

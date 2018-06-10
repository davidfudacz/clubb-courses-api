/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category')

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/categories/', () => {

    beforeEach(async() => {
      await Category.create({
        name: 'beanies',
      })
    })

    it('GET /api/categories', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('beanies')
        })
    })
    it('PUT /api/categories', () => {
      var newCategory = {name: 'top hats'}
      return request(app)
        .put('/api/categories/1')
        .send(newCategory)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('top hats')
        })
    })
    it('POST /api/categories/new-category', () => {
      var newCategory = {name: 'baseball caps'}
      return request(app)
        .post('/api/categories/new-category')
        .send(newCategory)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('baseball caps')
          expect(res.body.id).to.be.equal(2)
        })
    })
  }) // end describe('/api/orders')
}) // end describe('Order routes')

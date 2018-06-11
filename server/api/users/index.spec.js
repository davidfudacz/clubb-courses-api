/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { User } = require('../../db/models')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {

    beforeEach(async() => {
      const users = [
        {
          givenName: 'Dave',
          surname: 'Fudacz',
          email: 'davidfudacz@gmail.com',
        },
        {
          givenName: 'Cheryl',
          surname: 'Catrini',
          email: 'cheryl.catrini@gmail.com',
        }
      ]
      await User.bulkCreate(users)
    })

    it('GETs all users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[1].givenName).to.be.a('string')
        })
    })

    it('GETs a single user by id', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(1)
          expect(res.body.givenName).to.be.a('string')
        })
    })
    // it('PUT /api/categories', () => {
    //   var newCategory = {name: 'top hats'}
    //   return request(app)
    //     .put('/api/categories/1')
    //     .send(newCategory)
    //     .expect(200)
    //     .then(res => {
    //       expect(res.body).to.be.an('object')
    //       expect(res.body.name).to.be.equal('top hats')
    //     })
    // })
    // it('POST /api/categories/new-category', () => {
    //   var newCategory = {name: 'baseball caps'}
    //   return request(app)
    //     .post('/api/categories/new-category')
    //     .send(newCategory)
    //     .expect(200)
    //     .then(res => {
    //       expect(res.body).to.be.an('object')
    //       expect(res.body.name).to.be.equal('baseball caps')
    //       expect(res.body.id).to.be.equal(2)
    //     })
    // })
  }) // end describe('/api/clubs')
}) // end describe('Club routes')

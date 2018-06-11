/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../../server')
const { Architect } = require('../db/models')

describe('Architect routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/architects/', () => {

    beforeEach(async() => {
      try {
        const architects = [
          {
            givenName: 'Donald',
            surname: 'Ross',
            birthYear: 1872,
            deathYear: 1948,
          },
          {
            givenName: 'Tom',
            surname: 'Fazio',
            birthYear: 1945,
          },
        ]
        const architectProms = architects.map(architect => {
          return Architect.create(architect)
        })
        await Promise.all(architectProms)
      }
      catch (err) {
        console.log(err)
      }
    })

    it('GETs all architects', () => {
      return request(app)
        .get('/api/architects')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[1].givenName).to.be.a('string')
        })
    })

    it('GETs a single architect by id', () => {
      return request(app)
        .get('/api/architects/1')
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
  }) // end describe('/api/architects')
}) // end describe('Architect routes')

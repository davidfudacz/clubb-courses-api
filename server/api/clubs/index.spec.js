/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Club } = require('../../db/models')

describe('Club routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/clubs/', () => {

    beforeEach(async() => {
      const clubs = [
        {
          name: 'Beverly Country Club',
          shortName: 'Beverly',
          established: 1908,
        },
        {
          name: 'Butler Golf Club',
          shortName: 'Butler',
          established: 1974,
        },
        {
          name: 'Old Elm Club',
          shortName: 'Old Elm',
          established: 1912,
        }
      ]
      await Club.bulkCreate(clubs)
    })

    it('GETs all clubs', () => {
      return request(app)
        .get('/api/clubs')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(3)
          expect(res.body[0].shortName).to.be.equal('Beverly')
        })
    })

    it('GETs a single club by id', () => {
      return request(app)
        .get('/api/clubs/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.shortName).to.be.equal('Beverly')
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

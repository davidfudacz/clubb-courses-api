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
          informal: 'Beverly',
          established: 1908,
        },
        {
          name: 'Butler Golf Club',
          informal: 'Butler',
          established: 1974,
        },
        {
          name: 'Old Elm Club',
          informal: 'Old Elm',
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
          res.body.forEach(club => expect(club.informal).to.be.a('string'))
        })
    })

    it('GETs a single club by id', () => {
      return request(app)
        .get('/api/clubs/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(1)
          expect(res.body.informal).to.be.a('string')
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
  }) // end describe('/api/clubs')


  describe('/api/clubs/', () => {
    it('POSTs a new club', () => {
      var newClub = {
        name: 'Ridge Country Club',
        informal: 'Ridge',
        established: '1940',
      }
      return request(app)
        .post('/api/clubs')
        .send(newClub)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('Ridge Country Club')
          expect(res.body.id).to.be.equal(1)
        })
    })
  }) // end describe('/api/clubs')
}) // end describe('Club routes')

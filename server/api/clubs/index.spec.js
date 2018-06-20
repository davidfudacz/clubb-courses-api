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

  describe('GET /api/clubs/', () => {

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
  }) // end describe('GET /api/clubs')


  describe('POST /api/clubs', () => {
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
  }) // end describe('POST /api/clubs')


  describe.skip('PUT /api/clubs', () => {

    beforeEach(async() => {
      await Club.create({
        name: 'Old Elm Club',
        informal: 'Old Elm',
        established: 1912,
      })
    })
    it('PUTs to update an existing club', () => {
      var updatedClub = {
        established: 1940,
      }
      return request(app)
        .put('/api/clubs/1')
        .send(updatedClub)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('Old Elm Club')
          expect(res.body.established).to.be.equal('1940')
          expect(res.body.id).to.be.equal(1)
        })
    })
  }) // end describe('PUT /api/clubs')
}) // end describe('Club routes')

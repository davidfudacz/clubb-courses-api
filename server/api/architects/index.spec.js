/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Architect } = require('../../db/models')

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

    it('POSTs an architect', () => {
      var architect = {
        givenName: 'George',
        surname: 'Fazio',
        birthYear: 1915,
        deathYear: 1948,
      }

      return request(app)
        .post('/api/architects')
        .send(architect)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.givenName).to.be.equal('George')
          expect(res.body.deathYear).to.be.equal('1948')
          expect(res.body.id).to.be.equal(3)
        })
    })

    it('PUTs to update an existing architect', async () => {
      var architect = {
        givenName: 'George',
        surname: 'Fazio',
        birthYear: 1915,
        deathYear: 1948,
      }
      await Architect.create(architect)

      const updatedArchitect = {
        deathYear: 1950,
      }

      return request(app)
        .put('/api/architects/3')
        .send(updatedArchitect)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.givenName).to.be.equal('George')
          expect(res.body.deathYear).to.be.equal('1950')
          expect(res.body.id).to.be.equal(3)
        })
    })
  }) // end describe('/api/architects')
}) // end describe('Architect routes')

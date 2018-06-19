/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../../server')
const { Player } = require('../db/models')

describe('Player routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/players/', () => {

    beforeEach(async() => {
      try {
        const players = [
          {
            givenName: 'Tiger',
            surname: 'Woods',
            birthYear: 1975,
          },
          {
            givenName: 'Ben',
            surname: 'Hogan',
            birthYear: 1912,
            deathYear: 1997,
          },
        ]
        const playerProms = players.map(player => {
          return Player.create(player)
        })
        await Promise.all(playerProms)
      }
      catch (err) {
        console.log(err)
      }
    })

    it('GETs all players', () => {
      return request(app)
        .get('/api/players')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[1].givenName).to.be.a('string')
        })
    })

    it('GETs a single player by id', () => {
      return request(app)
        .get('/api/players/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(1)
          expect(res.body.givenName).to.be.a('string')
        })
    })

    it('POST /api/players', () => {
      const player = {
        givenName: 'Jordan',
        surname: 'Speith',
        birthYear: 1992,
      }
      return request(app)
        .post('/api/players')
        .send(player)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.givenName).to.be.equal('Jordan')
          expect(res.body.id).to.be.equal(3)
        })
    })

    it('PUT /api/players', async () => {
      const player = {
        givenName: 'Jordan',
        surname: 'Speith',
        birthYear: 1992,
      }
      await Player.create(player)

      const newPlayer = {
        surname: 'Spieth',
      }

      return request(app)
        .put('/api/players/3')
        .send(newPlayer)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.surname).to.be.equal('Spieth')
          expect(res.body.id).to.be.equal(3)
        })
    })
  }) // end describe('/api/players')
}) // end describe('Player routes')

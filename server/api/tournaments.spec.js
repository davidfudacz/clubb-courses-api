/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../../server')
const { Tournament } = require('../db/models')

describe('Tournament routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/tournaments/', () => {

    beforeEach(async() => {
      try {
        const tournaments = [
          {
            name: 'The Masters Invitational',
            informal: 'The Masters',
            established: 1934,
          },
          {
            name: 'The Open Championship',
            informal: 'The British Open',
            established: 1860,
          },
        ]
        const tournamentProms = tournaments.map(tournament => {
          return Tournament.create(tournament)
        })
        await Promise.all(tournamentProms)
      }
      catch (err) {
        console.log(err)
      }
    })

    it('GETs all tournaments', () => {
      return request(app)
        .get('/api/tournaments')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[0].name).to.be.a('string')
        })
    })

    it('GETs a single tournament by id', () => {
      return request(app)
        .get('/api/tournaments/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(1)
          expect(res.body.informal).to.be.a('string')
        })
    })

    it('POST /api/tournaments', () => {
      var tournament = {
        name: 'The US Open Championship',
        informal: 'US Open',
        established: 1890,
      }
      return request(app)
        .post('/api/tournaments')
        .send(tournament)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.informal).to.be.equal('US Open')
          expect(res.body.id).to.be.equal(3)
        })
    })

    it('PUT /api/tournaments/', async () => {
      var tournament = {
        name: 'The US Open Championship',
        informal: 'US Open',
        established: 1890,
      }
      await Tournament.create(tournament)
      const newTournament = {
        informal: 'The Open',
        established: 1887,
      }

      return request(app)
        .put('/api/tournaments/3')
        .send(newTournament)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.informal).to.be.equal('The Open')
          expect(res.body.established).to.be.equal('1887')
          expect(res.body.id).to.be.equal(3)
        })
    })
  }) // end describe('/api/tournaments')
}) // end describe('Tournament routes')

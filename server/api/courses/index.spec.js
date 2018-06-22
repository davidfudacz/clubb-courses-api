/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Club, Course } = require('../../db/models')

describe('Course routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/courses/', () => {

    beforeEach(async() => {
      await Club.create({
          name: 'Beverly Country Club',
          informal: 'Beverly',
          established: 1908,
        })

      const courses = [
        {
          name: 'North Course',
          informal: 'North',
          numOfHoles: 18,
          clubId: 1,
        },
        {
          name: 'South Course',
          informal: 'South',
          numOfHoles: 18,
          clubId: 1,
        }
      ]
      await Course.bulkCreate(courses)

    })

    it('GETs all courses', () => {
      return request(app)
        .get('/api/courses')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[0].informal).to.be.a('string')
        })
    })

    it('GETs a single course by id', () => {
      return request(app)
        .get('/api/courses/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.id).to.be.equal(1)
          expect(res.body.informal).to.be.a('string')
        })
    })
  }) // end describe('/api/courses')


  describe('PUT /api/courses', () => {

    beforeEach(async() => {
      await Course.create({
        name: 'South Course',
        informal: 'South',
        numOfHoles: 18,
      })
    })
    it('PUTs to update an existing course', () => {
      var updatedCourse = {
        informal: 'Not South',
        numOfHoles: 9,
      }
      return request(app)
        .put('/api/courses/1')
        .send(updatedCourse)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('South Course')
          expect(res.body.informal).to.be.equal('Not South')
          expect(res.body.numOfHoles).to.be.equal('9')
          expect(res.body.id).to.be.equal(1)
        })
    })
  }) // end describe('PUT /api/courses')
}) // end describe('Course routes')

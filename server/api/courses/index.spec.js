/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Course } = require('../../db/models')

describe('Course routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/courses/', () => {

    beforeEach(async() => {
      const courses = [
        {
          name: 'North Course',
          shortName: 'North',
          built: 1908,
          numOfHoles: 18,
        },
        {
          name: 'South Course',
          shortName: 'South',
          built: 1974,
          numOfHoles: 18,
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
          expect(res.body[0].shortName).to.be.equal('North')
        })
    })

    it('GETs a single course by id', () => {
      return request(app)
        .get('/api/courses/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.shortName).to.be.equal('North')
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

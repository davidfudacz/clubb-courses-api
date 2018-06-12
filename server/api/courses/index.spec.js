/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Course, Architect } = require('../../db/models')

describe('Course routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/courses/', () => {

    beforeEach(async() => {
      const courses = [
        {
          name: 'North Course',
          informal: 'North',
          built: 1908,
          numOfHoles: 18,
        },
        {
          name: 'South Course',
          informal: 'South',
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

  describe('/api/courses/1/architects', () => {

    beforeEach(async() => {
      try {
        await Course.create({
          name: 'North Course',
          informal: 'Beverly',
          built: 1908,
          numOfHoles: 18,
        })

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
          {
            givenName: 'Tom',
            surname: 'Doak',
            birthYear: 1950,
          },
        ]

        const architectProms = architects.map(architect => Architect.create(architect))
        await Promise.all(architectProms)

        const course = await Course.findById(1)

        await course.addArchitects([1, 2])

      }
      catch (err) {
        console.log(err)
      }
    })

    it('GETs all architects of a course and only the architects of that course', () => {
      return request(app)
        .get('/api/courses/1/architects')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          res.body.forEach(architect => expect(architect.courses[0].id).to.be.equal(1))
          res.body.forEach(architect => expect(architect.givenName).to.be.a('string'))
          
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

/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Club, Course } = require('../../db/models')

describe('Club/courses routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/clubs/1/courses', () => {

    beforeEach(async() => {
      try {
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
          },
          {
            name: 'South Course',
            informal: 'South',
            numOfHoles: 18,
          },
          {
            name: 'Dummy Course',
            informal: 'Dummy',
            numOfHoles: 18,
          }
        ]

        const courseProms = courses.map(course => Course.create(course))
        await Promise.all(courseProms)

        const club = await Club.findById(1)

        await club.addCourses([1, 2])

      }
      catch (err) {
        console.log(err)
      }
    })

    it('GETs all courses of a club and only the courses of that club', () => {
      return request(app)
        .get('/api/clubs/1/courses')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          res.body.forEach(course => expect(course.clubId).to.be.equal(1))
          res.body.forEach(course => expect(course.name).to.be.a('string'))
        })
    })

    it('POST /api/clubs/1/courses', () => {
      var newCourse = {
        name: 'North Course',
        informal: 'North',
        built: 1940,
        numOfHoles: 18,
      }
      return request(app)
        .post('/api/clubs/1/courses')
        .send(newCourse)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal('North Course')
          expect(res.body.id).to.be.equal(4)
          expect(res.body.clubId).to.be.equal(1)
        })
    })
  }) // end describe('/api/clubs/1/courses')
}) // end describe('Club/courses routes')

/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Course, Architect, Build } = require('../../db/models')

describe('Courses/builds routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/courses/1/builds', () => {

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

        const build = await Build.create({
          buildType: 'original',
          year: 1924,
          courseId: course.id,
          numOfHoles: 18,
        })
        const secondBuild = await Build.create({
          buildType: 'restoration',
          year: 2004,
          courseId: course.id,
          numOfHoles: 18,
        })

        await build.addArchitects([1, 2])
        await secondBuild.addArchitect(3)

      }
      catch (err) {
        console.log(err)
      }
    })

    it('GETs all builds of a course and only the builds of that course', () => {
      return request(app)
        .get('/api/courses/1/builds')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          expect(res.body[0].buildType).to.be.equal('original')
          expect(res.body[1].buildType).to.be.equal('restoration')
          res.body.forEach(build => expect(build.courseId).to.be.equal(1))
          res.body.forEach(build => expect(build.architects).to.be.an('array'))
          res.body.forEach(build => expect(build.architects[0].givenName).to.be.a('string'))
        })
    })

    it('POSTs a course build', () => {
      var newCourse = {
        buildType: 'original',
        year: 1983,
        numOfHoles: 18,
      }
      return request(app)
        .post('/api/courses/1/builds')
        .send(newCourse)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.courseId).to.be.equal(1)
          expect(res.body.id).to.be.equal(3)
        })
    })

    it('POSTs mulitple architects for a course build', async () => {
      var newCourse = {
        buildType: 'original',
        year: 1983,
        numOfHoles: 18,
      }
      await request(app)
        .post('/api/courses/1/builds')
        .send(newCourse)
        .expect(200)

      var architects = [1, 2]
      return request(app)
        .post('/api/courses/1/builds/3/architects')
        .send(architects)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.courseId).to.be.equal(1)
          expect(res.body.id).to.be.equal(3)
        })
    })
  }) // end describe('/api/courses/1/builds')
}) // end describe('Courses/builds routes')

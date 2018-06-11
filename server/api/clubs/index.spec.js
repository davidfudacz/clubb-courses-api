/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Club, Course, Employee } = require('../../db/models')

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
            built: 1908,
            numOfHoles: 18,
          },
          {
            name: 'South Course',
            informal: 'South',
            built: 1974,
            numOfHoles: 18,
          },
          {
            name: 'Dummy Course',
            informal: 'Dummy',
            built: 1974,
            numOfHoles: 18,
          }
        ]

        const courseProms = courses.map(course => Course.create(course))
        await Promise.all(courseProms)

        const club = await Club.findById(1)

        await club.addCourses([1,2])

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

  describe('/api/clubs/1/employees', () => {

    beforeEach(async() => {
      try {
        await Club.create({
          name: 'Beverly Country Club',
          informal: 'Beverly',
          established: 1908,
        })

        const employees = [
          {
            givenName: 'Jason',
            surname: 'Moss',
          },
          {
            givenName: 'Bret',
            surname: 'Leon',
          },
          {
            givenName: 'John',
            surname: 'Varner',
          },
        ]

        const employeeProms = employees.map(employee => Employee.create(employee))
        await Promise.all(employeeProms)

        const club = await Club.findById(1)

        await club.addEmployees([1, 2])

      }
      catch (err) {
        console.log(err)
      }
    })

    it('GETs all employees of a club and only employees of that club', () => {
      return request(app)
        .get('/api/clubs/1/employees')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.be.equal(2)
          res.body.forEach(employee => expect(employee.clubs[0].id).to.be.equal(1))
          res.body.forEach(employee => expect(employee.givenName).to.be.a('string'))
          
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

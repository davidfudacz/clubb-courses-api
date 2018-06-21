/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../../server')
const { Club, Employee } = require('../../db/models')

describe('Club routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

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
          res.body.forEach(employee => expect(employee.givenName).to.be.a('string'))
        })
    })

    it('POSTs an employee to the club', async () => {
      try {
        var employee = {
          givenName: 'Brian',
          surname: 'Kribs',
        }
        await request(app)
          .post('/api/clubs/1/employees')
          .send(employee)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.givenName).to.be.equal('Brian')
            expect(res.body.id).to.be.equal(4)
          })
          return request(app)
          .get('/api/clubs/1/employees')
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body.length).to.be.equal(3)
          })
      }
      catch (err) {
        console.log(err)
      }
    })
  }) // end describe('/api/clubs')
}) // end describe('Club routes')

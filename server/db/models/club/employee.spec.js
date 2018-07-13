/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Employee } = require('../../models')

describe('Employee model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for givenName', async () => {
        let error
        try {
          await Employee.create({
            surname: 'SirName',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for surname', async () => {
        let error
        try {
          await Employee.create({
            givenName: 'GiveName',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe do not allow null

    describe('do not allow empty', () => {
      it('for givenName', async () => {
        let error
        try {
          await Employee.create({
            surname: 'SirName',
            givenName: '',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for surname', async () => {
        let error
        try {
          await Employee.create({
            givenName: 'GiveName',
            surname: '',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe do not allow empty

    describe('email is an email', () => {
      it('for email', async () => {
        let error
        try {
          await Employee.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe email is an email

    describe('entries are numeric', () => {
      it('for startYear', async () => {
        let error
        try {
          await Employee.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud.com',
            startYear: 'haha',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for endYear', async () => {
        let error
        try {
          await Employee.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud.com',
            endYear: 'haha',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe entries are numeric

    describe('url is a url', () => {
      it('for imgUrl', async () => {
        let error
        try {
          await Employee.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud.com',
            imgUrl: 'http://img',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe url is a url
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let employee, error
        try {
          employee = await Employee.create({
            givenName: 'GiveName',
            surname: 'SirName',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(employee.dataValues).length).to.be.equal(10)
        expect(employee.givenName).to.be.equal('GiveName')
        expect(employee.surname).to.be.equal('SirName')
        expect(employee.email).to.be.equal('dave@fud.com')
      })
    }) // end describe creating an instance
  }) // end describe creation
}) // end describe('Employee model')

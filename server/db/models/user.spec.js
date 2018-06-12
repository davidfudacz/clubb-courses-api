/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const { User } = require('../models')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {

      it('returns true if the password is correct', async () => {
        const dave = await User.create({
          givenName: 'Dave',
          surname: 'Fud',
          email: 'dave@fud.com',
          password: 'yayaya'
        })
        expect(dave.correctPassword('yayaya')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', async () => {
        const dave = await User.create({
          givenName: 'Dave',
          surname: 'Fud',
          email: 'lol@lol.com',
          password: 'yayaya'
        })
        expect(dave.correctPassword('yaya')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for givenName', async () => {
        let error
        try {
          await User.create({
            surname: 'SirName',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for surname', async () => {
        let error
        try {
          await User.create({
            givenName: 'GiveName',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for email', async () => {
        let error
        try {
          await User.create({
            givenName: 'GiveName',
            surname: 'SirName',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow null

    describe('do not allow empty', () => {
      it('for givenName', async () => {
        let error
        try {
          await User.create({
            surname: 'SirName',
            givenName: '',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for surname', async () => {
        let error
        try {
          await User.create({
            givenName: 'GiveName',
            surname: '',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow empty

    describe('defaults', () => {
      it('isAdmin should default to false', async () => {
        let user, error
        try {
          user = await User.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(user.isAdmin).to.be.equal(false)
      })

      it('changePasswordFlag should default to false', async () => {
        let user, error
        try {
          user = await User.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud.com',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        expect(user.changePasswordFlag).to.be.equal(false)
      })
    }) // end describe defaults

    describe('changing isAdmin', () => {
      it('should not be able to change isAdmin to empty string', async () => {
        let user, error
        try {
          user = await User.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud.com',
          })
          await user.update({
            isAdmin: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
      it('should not be able to change isAdmin to null', async () => {
        let user, error
        try {
          user = await User.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud.com',
          })
          await user.update({
            isAdmin: null,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe defaults

    describe('email is an email', () => {
      it('for email', async () => {
        let error
        try {
          await User.create({
            surname: 'SirName',
            givenName: 'GiveName',
            email: 'dave@fud',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe email is an email
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let user, error
        try {
          user = await User.create({
            givenName: 'GiveName',
            surname: 'SirName',
            email: 'dave@fud.com',
            password: 'pass',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(user.dataValues).length).to.be.equal(11)
        expect(user.givenName).to.be.equal('GiveName')
        expect(user.surname).to.be.equal('SirName')
        expect(user.email).to.be.equal('dave@fud.com')
        expect(user.correctPassword('pass')).to.be.equal(true)
        expect(user.changePasswordFlag).to.be.equal(false)
        expect(user.isAdmin).to.be.equal(false)
        expect(user.googleId).to.be.equal(null)
      })
    }) // end describe creating an instance
  }) // end describe creation
}) // end describe('User model')

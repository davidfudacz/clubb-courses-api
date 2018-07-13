/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Publisher } = require('../../models')

describe('Publisher model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await Publisher.create({
            informal: 'informal',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for informal', async () => {
        let error
        try {
          await Publisher.create({
            name: 'name',
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
      it('for name', async () => {
        let error
        try {
          await Publisher.create({
            name: '',
            informal: 'informal',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for informal', async () => {
        let error
        try {
          await Publisher.create({
            name: 'name',
            informal: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe do not allow empty
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let publisher, error
        try {
          publisher = await Publisher.create({
            name: 'publisher publisher',
            informal: 'publisher',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(publisher.dataValues).length).to.be.equal(5)
        expect(publisher.name).to.be.equal('publisher publisher')
        expect(publisher.informal).to.be.equal('publisher')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe publisher model

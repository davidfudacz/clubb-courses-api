/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../..')
const { Subdivision } = require('..')

describe('Subdivision model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await Subdivision.create({
            abbreviation: 'AL',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for abbreviation', async () => {
        let error
        try {
          await Subdivision.create({
            name: 'Alabama',
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
          await Subdivision.create({
            name: '',
            abbreviation: 'AL',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for abbreviation', async () => {
        let error
        try {
          await Subdivision.create({
            name: 'Alabama',
            abbreviation: '',
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
        let subdivision, error
        try {
          subdivision = await Subdivision.create({
            name: 'subdivision',
            abbreviation: 'AL'
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(subdivision.dataValues).length).to.be.equal(6)
        expect(subdivision.name).to.be.equal('subdivision')
        expect(subdivision.abbreviation).to.be.equal('AL')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe Subdivision model

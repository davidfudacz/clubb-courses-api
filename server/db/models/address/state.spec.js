/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { State } = require('../../models')

describe('State model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await State.create({
            abbreviation: 'AL',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for abbreviation', async () => {
        let error
        try {
          await State.create({
            name: 'Alabama',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow null

    describe('do not allow empty', () => {
      it('for name', async () => {
        let error
        try {
          await State.create({
            name: '',
            abbreviation: 'AL',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for abbreviation', async () => {
        let error
        try {
          await State.create({
            name: 'Alabama',
            abbreviation: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow empty
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let state, error
        try {
          state = await State.create({
            name: 'state',
            abbreviation: 'AL'
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(state.dataValues).length).to.be.equal(6)
        expect(state.name).to.be.equal('state')
        expect(state.abbreviation).to.be.equal('AL')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe State model

/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Tournament } = require('../../models')

describe('Tournament model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await Tournament.create({
            informal: 'this'
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
          await Tournament.create({
            name: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe do not allow empty

    describe('years are numeric', () => {
      it('for extablished', async () => {
        let error
        try {
          await Tournament.create({
            name: 'SirName',
            established: 'haha',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe years are numeric
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let tournament, error
        try {
          tournament = await Tournament.create({
            name: 'The Masters',
            informal: 'Masters',
            established: 1934,
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(tournament.dataValues).length).to.be.equal(6)
        expect(tournament.name).to.be.equal('The Masters')
        expect(tournament.informal).to.be.equal('Masters')
        expect(tournament.established).to.be.equal('1934')
      })
    }) // end describe creating an instance
  }) // end describe validations
}) // end describe Architect model

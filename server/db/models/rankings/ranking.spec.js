/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Ranking } = require('../../models')

describe('Ranking model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for rank', async () => {
        let error
        try {
          await Ranking.create({
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
      it('for rank', async () => {
        let error
        try {
          await Ranking.create({
            rank: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(2)
      })
    }) // end describe do not allow empty

    describe('is Numeric', () => {
      it('for rank', async () => {
        let error
        try {
          await Ranking.create({
            rank: 'haha',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe is Numeric
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let ranking, error
        try {
          ranking = await Ranking.create({
            rank: '2',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(ranking.dataValues).length).to.be.equal(6)
        expect(ranking.rank).to.be.equal('2')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe Ranking model

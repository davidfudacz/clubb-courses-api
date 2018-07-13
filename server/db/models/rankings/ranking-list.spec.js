/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { RankingList } = require('../../models')

describe('RankingList model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for year', async () => {
        let error
        try {
          await RankingList.create({
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
      it('for year', async () => {
        let error
        try {
          await RankingList.create({
            year: '',
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
      it('for year', async () => {
        let error
        try {
          await RankingList.create({
            year: 'haha',
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
        let rankingList, error
        try {
          rankingList = await RankingList.create({
            year: '1980',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(rankingList.dataValues).length).to.be.equal(6)
        expect(rankingList.year).to.be.equal('1980')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe RankingList model

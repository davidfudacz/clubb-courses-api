/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Address } = require('../../models')

describe('Address model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for lineOne', async () => {
        let error
        try {
          await Address.create({
            zip: 60657,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for zip', async () => {
        let error
        try {
          await Address.create({
            lineOne: '3434 street',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow null

    describe('do not allow empty', () => {
      it('for lineOne', async () => {
        let error
        try {
          await Address.create({
            lineOne: '',
            zip: 60657,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow empty

    describe('entries must be numeric', () => {
      it('for zip', async () => {
        let error
        try {
          await Address.create({
            lineOne: '3434 street',
            zip: 'haha',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe entries must be numeric
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let address, error
        try {
          address = await Address.create({
            lineOne: '3434 street',
            lineTwo: 'Unit 34',
            zip: 60657,
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(address.dataValues).length).to.be.equal(9)
        expect(address.lineOne).to.be.equal('3434 street')
        expect(address.lineTwo).to.be.equal('Unit 34')
        expect(address.zip).to.be.equal('60657')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe Address model

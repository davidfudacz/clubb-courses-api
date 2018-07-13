/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Tee } = require('../../models')

describe('Tee model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await Tee.create({
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
          await Tee.create({
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
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let tee, error
        try {
          tee = await Tee.create({
            name: 'Black',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(tee.dataValues).length).to.be.equal(4)
        expect(tee.name).to.be.equal('Black')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe tee model

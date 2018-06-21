/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Membership } = require('../../models')

describe('Membership model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await Membership.create({
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
          await Membership.create({
            name: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow empty

    describe('entries must be unique', () => {
      it('for name', async () => {
        let error
        try {
          await Membership.create({
            name: 'Membership',
          })
          await Membership.create({
            name: 'Membership',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeUniqueConstraintError')
      })
    }) // end describe entries must be unique
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let membership, error
        try {
          membership = await Membership.create({
            name: 'membership membership',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(membership.dataValues).length).to.be.equal(4)
        expect(membership.name).to.be.equal('membership membership')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe membership model

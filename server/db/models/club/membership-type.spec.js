/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { MembershipType } = require('../../models')

describe('MembershipType model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await MembershipType.create({
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
          await MembershipType.create({
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

    describe('entries must be unique', () => {
      it('for name', async () => {
        let error
        try {
          await MembershipType.create({
            name: 'MembershipType',
          })
          await MembershipType.create({
            name: 'MembershipType',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeUniqueConstraintError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe entries must be unique
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let membershipType, error
        try {
          membershipType = await MembershipType.create({
            name: 'membershipType membershipType',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(membershipType.dataValues).length).to.be.equal(4)
        expect(membershipType.name).to.be.equal('membershipType membershipType')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe membershipType model

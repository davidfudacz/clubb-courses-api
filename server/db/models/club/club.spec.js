/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Club } = require('../../models')

describe('Club model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await Club.create({
            informal: 'club',
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
          await Club.create({
            name: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow empty

    describe('years are numeric', () => {
      it('for established', async () => {
        let error
        try {
          await Club.create({
            name: 'club',
            established: 'haha'
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe years are numeric

    describe('url is a url', () => {
      it('for logoUrl', async () => {
        let error
        try {
          await Club.create({
            name: 'club',
            logoUrl: 'soNotAUrl'
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
      it('for websiteUrl', async () => {
        let error
        try {
          await Club.create({
            name: 'club',
            websiteUrl: 'soNotAUrl'
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe url is a url
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let club, error
        try {
          club = await Club.create({
            name: 'club club',
            informal: 'club',
            established: 1908,
            logoUrl: 'http://www.logo.com',
            websiteUrl: 'http://www.club.com'
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(club.dataValues).length).to.be.equal(10)
        expect(club.name).to.be.equal('club club')
        expect(club.informal).to.be.equal('club')
        expect(club.established).to.be.equal('1908')
        expect(club.logoUrl).to.be.equal('http://www.logo.com')
        expect(club.websiteUrl).to.be.equal('http://www.club.com')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe club model

/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Event, Course, Tournament } = require('../../models')

describe('Event model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    it('year must be numeric', async () => {
      let error
      try {
        await Event.create({
          year: 'haha',
        })
      }
      catch (err) {
        error = err
      }
      expect(error.name).to.be.equal('SequelizeValidationError')
      expect(error.errors.length).to.be.equal(1)
    })
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let event, error
        try {
          await Tournament.create({
            name: 'Masters',
          })

          await Course.create({
            numOfHoles: 18,
          })

          event = await Event.create({
            year: '1908',
            courseId: 1,
            tournamentId: 1,
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(event.dataValues).length).to.be.equal(7)
        expect(event.year).to.be.equal('1908')
        expect(event.courseId).to.be.equal(1)
        expect(event.tournamentId).to.be.equal(1)
      })
    }) // end describe creating an instance
  }) // end describe validations
}) // end describe Architect model

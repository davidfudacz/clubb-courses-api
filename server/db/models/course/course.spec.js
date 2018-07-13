/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Course } = require('../../models')

describe('Course model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for numOfHoles', async () => {
        let error
        try {
          await Course.create({
            informal: 'course',
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
      it('for numOfHoles', async () => {
        let error
        try {
          await Course.create({
            name: 'north',
            numOfHoles: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(2)
      })
    }) // end describe do not allow empty

    describe('holes are numeric', () => {
      it('for numOfHoles', async () => {
        let error
        try {
          await Course.create({
            name: 'course',
            numOfHoles: 'haha'
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe years are numeric

    describe.skip('holes can only be 9 or 18', () => {
      it('for numOfHoles', async () => {
        let error
        try {
          await Course.create({
            name: 'course',
            numOfHoles: '10'
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeDatabaseError')
      })
    }) // end describe years are numeric
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let course, error
        try {
          course = await Course.create({
            name: 'course course',
            informal: 'course',
            numOfHoles: '18',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(course.dataValues).length).to.be.equal(7)
        expect(course.name).to.be.equal('course course')
        expect(course.informal).to.be.equal('course')
        expect(course.numOfHoles).to.be.equal('18')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe course model

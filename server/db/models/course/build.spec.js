/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Build } = require('../../models')

describe('Build model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for numOfHoles', async () => {
        let error
        try {
          await Build.create({
            buildType: 'original',
            year: 1908,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow null

    describe('do not allow empty', () => {
      it('for numOfHoles', async () => {
        let error
        try {
          await Build.create({
            buildType: 'original',
            year: 1908,
            numOfHoles: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow null

    describe('entries are numeric', () => {
      it('for year', async () => {
        let error
        try {
          await Build.create({
            buildType: 'original',
            year: '',
            numOfHoles: 18,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for numOfHoles', async () => {
        let error
        try {
          await Build.create({
            buildType: 'original',
            year: 1908,
            numOfHoles: 'haha',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe entries are numeric

    describe('buildType can only be specified strings', () => {
      it('for buildType', async () => {
        let error
        try {
          await Build.create({
            buildType: 'haha',
            year: 1908,
            numOfHoles: 18,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeDatabaseError')
      })
    }) // end describe buildType can only be specified strings
  }) // end describe validations

    describe('creation', () => {
      describe('creating an instance', () => {
        it('persists all columns', async () => {
          let build, error
          try {
            build = await Build.create({
              buildType: 'original',
              year: 1908,
              numOfHoles: 18,
            })
          }
          catch (err) {
            error = err
          }
          expect(error).to.be.an('undefined')
          // just in case we add something and forget to test it...
          // add in the created and updatedAt fields
          expect(Object.keys(build.dataValues).length).to.be.equal(7)
          expect(build.buildType).to.be.equal('original')
          expect(build.year).to.be.equal('1908')
        })
      }) // end describe creating an instance
  }) // end describe creations
}) // end describe build model

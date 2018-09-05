/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Scorecard } = require('../../models')

describe('Scorecard model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('urls are valid', () => {
      it('for imgUrl', async () => {
        let error
        try {
          await Scorecard.create({
            imgUrl: 'noturl',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe urls are valid
  }) // end describe validations

    describe('creation', () => {
      describe('creating an instance', () => {
        it('persists all columns', async () => {
          let build, error
          try {
            build = await Scorecard.create({
              imgUrl: 'http://www.img.com/image',
            })
          }
          catch (err) {
            error = err
          }
          expect(error).to.be.an('undefined')
          // just in case we add something and forget to test it...
          // add in the created and updatedAt fields
          expect(Object.keys(build.dataValues).length).to.be.equal(5)
          expect(build.imgUrl).to.be.equal('http://www.img.com/image')
        })
      }) // end describe creating an instance
  }) // end describe creations
}) // end describe build model

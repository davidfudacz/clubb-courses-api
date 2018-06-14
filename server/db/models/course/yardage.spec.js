/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Yardage } = require('../../models')

describe('Yardage model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for yardage', async () => {
        let error
        try {
          await Yardage.create({
            par: 72,
            rating: 75.1,
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for par', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            rating: 75.1,
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for rating', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            par: 72,
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for slope', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            rating: 75.1,
            par: 72,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow null

    describe('do not allow empty', () => {
      it('for yardage', async () => {
        let error
        try {
          await Yardage.create({
            yardage: '',
            par: 72,
            rating: 75.1,
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for par', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            par: '',
            rating: 75.1,
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for rating', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            par: 72,
            rating: '',
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for slope', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            par: 72,
            rating: 75.1,
            slope: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow empty

    describe('entries are numeric', () => {
      it('for yardage', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 'haha',
            par: 72,
            rating: 75.1,
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for par', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            par: 'haha',
            rating: 75.1,
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
      
      it('for rating', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            par: 72,
            rating: 'haha',
            slope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for slope', async () => {
        let error
        try {
          await Yardage.create({
            yardage: 7550,
            par: 72,
            rating: 75.1,
            slope: 'haha',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe entries are numeric
  }) // end describe validations

  describe('getters and setters', () => {
    describe('setter', () => {
      it('multiplies by 10', async () => {
        let yardage, error
        try {
          yardage = await Yardage.create({
            yardage: 7550,
            par: 72,
            rating: 75.1,
            slope: 140,
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        expect(yardage.dataValues.rating).to.be.equal('751')
      })
    }) // end describe setter

    describe('getter', () => {
      it('divides by 10', async () => {
        let yardage, error
        try {
          yardage = await Yardage.create({
            yardage: 7550,
            par: 72,
            rating: 75.1,
            slope: 140,
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        expect(yardage.dataValues.rating).to.be.equal('751')
        expect(yardage.rating).to.be.equal('75.1')
      })
    }) // end describe getter
  }) // end describe getters and setters

    describe('creation', () => {
      describe('creating an instance', () => {
        it('persists all columns', async () => {
          let yardage, error
          try {
            yardage = await Yardage.create({
              yardage: 7550,
              par: 72,
              rating: 75.1,
              slope: 140,
            })
          }
          catch (err) {
            error = err
          }
          expect(error).to.be.an('undefined')
          // just in case we add something and forget to test it...
          // add in the created and updatedAt fields
          expect(Object.keys(yardage.dataValues).length).to.be.equal(8)
          expect(yardage.yardage).to.be.equal('7550')
          expect(yardage.par).to.be.equal('72')
          expect(yardage.rating).to.be.equal('75.1')
          expect(yardage.slope).to.be.equal('140')
        })
      }) // end describe creating an instance
  }) // end describe creations
}) // end describe yardage model

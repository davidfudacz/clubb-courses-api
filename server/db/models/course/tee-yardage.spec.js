/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../..')
const { TeeYardage } = require('..')

describe('TeeYardage model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for totalYardage', async () => {
        let error
        try {
          await TeeYardage.create({
            totalPar: 72,
            totalRating: 75.1,
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for totalPar', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalRating: 75.1,
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for totalRating', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalPar: 72,
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for totalSlope', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalRating: 75.1,
            totalPar: 72,
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
      it('for totalYardage', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: '',
            totalPar: 72,
            totalRating: 75.1,
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(2)
      })

      it('for totalPar', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalPar: '',
            totalRating: 75.1,
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(2)
      })

      it('for totalRating', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalPar: 72,
            totalRating: '',
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for totalSlope', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalPar: 72,
            totalRating: 75.1,
            totalSlope: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(2)
      })
    }) // end describe do not allow empty

    describe('entries are numeric', () => {
      it('for totalYardage', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 'haha',
            totalPar: 72,
            totalRating: 75.1,
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for totalPar', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalPar: 'haha',
            totalRating: 75.1,
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
      
      it('for totalRating', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalPar: 72,
            totalRating: 'haha',
            totalSlope: 145,
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for totalSlope', async () => {
        let error
        try {
          await TeeYardage.create({
            totalYardage: 7550,
            totalPar: 72,
            totalRating: 75.1,
            totalSlope: 'haha',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })
    }) // end describe entries are numeric
  }) // end describe validations

  describe('getters and setters', () => {
    describe('setter', () => {
      it('multiplies by 10', async () => {
        let yardage, error
        try {
          yardage = await TeeYardage.create({
            totalYardage: 7550,
            totalPar: 72,
            totalRating: 75.1,
            totalSlope: 140,
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        expect(yardage.dataValues.totalRating).to.be.equal('751')
      })
    }) // end describe setter

    describe('getter', () => {
      it('divides by 10', async () => {
        let yardage, error
        try {
          yardage = await TeeYardage.create({
            totalYardage: 7550,
            totalPar: 72,
            totalRating: 75.1,
            totalSlope: 140,
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        expect(yardage.dataValues.totalRating).to.be.equal('751')
        expect(yardage.totalRating).to.be.equal('75.1')
      })
    }) // end describe getter
  }) // end describe getters and setters

    describe('creation', () => {
      describe('creating an instance', () => {
        it('persists all columns', async () => {
          let yardage, error
          try {
            yardage = await TeeYardage.create({
              frontYardage: 3597,
              backYardage: 3419,
              totalYardage: 7016,
              frontPar: 36,
              backPar: 35,
              totalPar: 71,
              frontRating: 37.7,
              backRating: 36.7,
              frontSlope: 140,
              backSlope: 137,
              totalRating: 74.4,
              totalSlope: 139,
            })
          }
          catch (err) {
            error = err
          }
          expect(error).to.be.an('undefined')
          // just in case we add something and forget to test it...
          // add in the created and updatedAt fields
          expect(Object.keys(yardage.dataValues).length).to.be.equal(18)
          expect(yardage.totalYardage).to.be.equal('7016')
          expect(yardage.totalPar).to.be.equal('71')
          expect(yardage.totalRating).to.be.equal('74.4')
          expect(yardage.totalSlope).to.be.equal('139')
          expect(yardage.frontYardage).to.be.equal('3597')
          expect(yardage.frontPar).to.be.equal('36')
          expect(yardage.frontRating).to.be.equal('37.7')
          expect(yardage.frontSlope).to.be.equal('140')
          expect(yardage.backYardage).to.be.equal('3419')
          expect(yardage.backPar).to.be.equal('35')
          expect(yardage.backRating).to.be.equal('36.7')
          expect(yardage.backSlope).to.be.equal('137')
        })
      }) // end describe creating an instance
  }) // end describe creations
}) // end describe yardage model

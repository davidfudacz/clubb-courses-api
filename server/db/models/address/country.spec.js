/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { Country } = require('../../models')

describe('Country model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for name', async () => {
        let error
        try {
          await Country.create({
            abbreviation: 'USA',
            informal: 'United States',
            demonym: 'American',
            demonymPlural: 'Americans',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for abbreviation', async () => {
        let error
        try {
          await Country.create({
            informal: 'United States',
            name: 'Unites States of America',
            demonym: 'American',
            demonymPlural: 'Americans',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for demonym', async () => {
        let error
        try {
          await Country.create({
            name: 'Unites States of America',
            informal: 'United States',
            abbreviation: 'USA',
            demonymPlural: 'Americans',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for demonymPlural', async () => {
        let error
        try {
          await Country.create({
            name: 'Unites States of America',
            informal: 'United States',
            abbreviation: 'USA',
            demonym: 'American',
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
          await Country.create({
            name: '',
            abbreviation: 'USA',
            informal: 'United States',
            demonym: 'American',
            demonymPlural: 'Americans',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for abbreviation', async () => {
        let error
        try {
          await Country.create({
            name: 'United States of America',
            informal: 'United States',
            abbreviation: '',
            demonym: 'American',
            demonymPlural: 'Americans',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for informal', async () => {
        let error
        try {
          await Country.create({
            name: 'United States of America',
            informal: '',
            abbreviation: 'USA',
            demonym: 'American',
            demonymPlural: 'Americans',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for demonym', async () => {
        let error
        try {
          await Country.create({
            name: 'United States of America',
            informal: 'United States',
            abbreviation: 'USA',
            demonym: '',
            demonymPlural: 'Americans',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
        expect(error.errors.length).to.be.equal(1)
      })

      it('for demonymPlural', async () => {
        let error
        try {
          await Country.create({
            name: 'United States of America',
            informal: 'United States',
            abbreviation: 'USA',
            demonym: 'American',
            demonymPlural: '',
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
        let country, error
        try {
          country = await Country.create({
            name: 'country',
            abbreviation: 'USA',
            informal: 'United States',
            demonym: 'American',
            demonymPlural: 'Americans',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(country.dataValues).length).to.be.equal(8)
        expect(country.name).to.be.equal('country')
        expect(country.informal).to.be.equal('United States')
        expect(country.demonym).to.be.equal('American')
        expect(country.demonymPlural).to.be.equal('Americans')
        expect(country.abbreviation).to.be.equal('USA')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe Country model

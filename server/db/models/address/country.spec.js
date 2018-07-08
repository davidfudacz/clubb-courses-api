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
            demonym: 'American',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for abbreviation', async () => {
        let error
        try {
          await Country.create({
            name: 'Unites States of America',
            demonym: 'American',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for demonym', async () => {
        let error
        try {
          await Country.create({
            name: 'Unites States of America',
            abbreviation: 'USA',
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
          await Country.create({
            name: '',
            abbreviation: 'USA',
            demonym: 'American',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for abbreviation', async () => {
        let error
        try {
          await Country.create({
            name: 'United States of America',
            abbreviation: '',
            demonym: 'American',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })

      it('for demonym', async () => {
        let error
        try {
          await Country.create({
            name: 'United States of America',
            abbreviation: 'USA',
            demonym: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
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
            demonym: 'American',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(country.dataValues).length).to.be.equal(6)
        expect(country.name).to.be.equal('country')
        expect(country.abbreviation).to.be.equal('USA')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe Country model

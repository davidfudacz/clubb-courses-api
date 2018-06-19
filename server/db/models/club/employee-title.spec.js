/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../../index')
const { EmployeeTitle } = require('../../models')

describe('EmployeeTitle model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validations', () => {
    describe('do not allow null', () => {
      it('for title', async () => {
        let error
        try {
          await EmployeeTitle.create({
            informal: 'informal',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow null

    describe('do not allow empty', () => {
      it('for title', async () => {
        let error
        try {
          await EmployeeTitle.create({
            title: '',
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeValidationError')
      })
    }) // end describe do not allow empty

    describe('entries must be unique', () => {
      it('for title', async () => {
        let error
        try {
          await EmployeeTitle.create({
            title: 'employeeTitle',
            informal: 'hahaha'
          })
          await EmployeeTitle.create({
            title: 'employeeTitle',
            informal: 'haha'
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeUniqueConstraintError')
      })

      it('for informal', async () => {
        let error
        try {
          await EmployeeTitle.create({
            title: 'employeeTitles',
            informal: 'haha'
          })
          await EmployeeTitle.create({
            title: 'employeeTitle',
            informal: 'haha'
          })
        }
        catch (err) {
          error = err
        }
        expect(error.name).to.be.equal('SequelizeUniqueConstraintError')
      })
    }) // end describe entries must be unique
  }) // end describe validations

  describe('creation', () => {
    describe('creating an instance', () => {
      it('persists all columns', async () => {
        let employeeTitle, error
        try {
          employeeTitle = await EmployeeTitle.create({
            title: 'employeeTitle employeeTitle',
            informal: 'employeeTitle',
          })
        }
        catch (err) {
          error = err
        }
        expect(error).to.be.an('undefined')
        // just in case we add something and forget to test it...
        // add in the created and updatedAt fields
        expect(Object.keys(employeeTitle.dataValues).length).to.be.equal(5)
        expect(employeeTitle.title).to.be.equal('employeeTitle employeeTitle')
        expect(employeeTitle.informal).to.be.equal('employeeTitle')
      })
    }) // end describe creating an instance
  }) // end describe creations
}) // end describe employeeTitle model

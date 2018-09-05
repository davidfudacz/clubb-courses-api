const router = require('express').Router()
const { MembershipType } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const membershipType = await MembershipType.findById(req.club.membershipTypeId, {
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    })
    if (!membershipType) {
      res.send(204)
    }
    else {
      res.json(membershipType)
    }
  }
  catch (err) {
    next(err)
  }
})

module.exports = router

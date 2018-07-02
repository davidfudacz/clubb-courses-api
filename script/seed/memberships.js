const { Membership } = require('../../server/db/models')

const memberships = [
  {
    name: 'Private'
  },
  {
    name: 'Public'
  },
]

async function seedMemberships () {
  await memberships.forEach(async membership => {
    await Membership.create(membership)
  })
  console.log(`Seeded ${memberships.length} Membership names`)
}

module.exports = seedMemberships

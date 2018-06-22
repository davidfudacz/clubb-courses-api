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
  const membershipProms = memberships.map(membership => {
    return Membership.create(membership)
  })
  await Promise.all(membershipProms)
  console.log(`Seeded ${memberships.length} Membership names`)
}

module.exports = seedMemberships

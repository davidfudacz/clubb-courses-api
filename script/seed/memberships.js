const { Membership } = require('../../server/db/models')

const memberships = [
  {
    id: 1,
    name: 'Private'
  },
  {
    id: 2,
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

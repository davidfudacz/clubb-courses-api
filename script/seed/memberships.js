const { Membership } = require('../../server/db/models')

async function seedMemberships () {
  const membershipProms = memberships.map(membership => {
    return Membership.create(membership)
  })
  await Promise.all(membershipProms)
  console.log(`Seeded ${memberships.length} Membership names`)
}

const memberships = [
  {
    name: 'Private'
  },
  {
    name: 'Public'
  },
]

module.exports = seedMemberships

const { MembershipType } = require('../../server/db/models')

const membershipTypes = [
  {
    name: 'Private'
  },
  {
    name: 'Public'
  },
  {
    name: 'Resort'
  }
]

async function seedMembershipTypes () {
  await membershipTypes.forEach(async membershipType => {
    await MembershipType.create(membershipType)
  })
  console.log(`Seeded ${membershipTypes.length} Membership Types`)
}

module.exports = seedMembershipTypes

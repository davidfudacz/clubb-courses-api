const { Scorecard } = require('../../server/db/models')

const scorecards = [
  {
    courseId: 1,
    imgUrl: 'http://www.2playthetips.com/images/cypress_point_sc.jpg'
  },
  {
    courseId: 2,
    imgUrl: 'http://www.2playthetips.com/images/SeminoleSC.jpg'
  }
]

async function seedScorecards () {
  const scorecardsProms = scorecards.map(scorecard => {
    return Scorecard.create(scorecard)
  })
  await Promise.all(scorecardsProms)
  console.log(`Seeded ${scorecards.length} scorecards`)
}

module.exports = seedScorecards

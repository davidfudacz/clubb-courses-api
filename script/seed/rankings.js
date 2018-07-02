const { Publisher, Ranking, RankingList, RankingListName } = require('../../server/db/models')

const publishers = [
  {
    name: 'Golf Digest Magazine',
    informal: 'Golf Digest',
  },
  {
    name: 'Golfweek Magazine',
    informal: 'Golfweek',
  },
  {
    name: 'Golf Magazine',
    informal: 'Golf',
  }
]

const rankingListNames = [
  {
    name: 'Top 100 Courses in the United States',
    informal: 'Top 100 (US)',
  },
  {
    name: `America's 100 Greatest Public Courses`,
    informal: 'Top 100 Public (US)',
  },
  {
    name: 'Top 100 Classic Courses',
    informal: 'Top 100 Classic',
  },
]

const rankingLists = [
  {
    rankingListNameId: 1,
    year: 2017,
    publisherId: 3,
  },
  {
    rankingListNameId: 2,
    year: 2017,
    publisherId: 1,
  },
  {
    rankingListNameId: 3,
    year: 2017,
    publisherId: 2,
  },
]

const rankings = [
  {
    rank: 1,
    courseId: 1,
    rankingListId: 1,
  },
  {
    rank: 2,
    courseId: 2,
    rankingListId: 1,
  },
  {
    rank: 3,
    courseId: 3,
    rankingListId: 1,
  },
  {
    rank: 4,
    courseId: 4,
    rankingListId: 1,
  },
  {
    rank: 5,
    courseId: 5,
    rankingListId: 1,
  },
  {
    rank: 6,
    courseId: 6,
    rankingListId: 1,
  },
  {
    rank: 1,
    courseId: 2,
    rankingListId: 2,
  },
  {
    rank: 2,
    courseId: 1,
    rankingListId: 2,
  },
  {
    rank: 3,
    courseId: 4,
    rankingListId: 2,
  },
  {
    rank: 4,
    courseId: 3,
    rankingListId: 2,
  },
  {
    rank: 5,
    courseId: 5,
    rankingListId: 2,
  },
  {
    rank: 6,
    courseId: 6,
    rankingListId: 2,
  },
  {
    rank: 1,
    courseId: 3,
    rankingListId: 3,
  },
  {
    rank: 2,
    courseId: 1,
    rankingListId: 3,
  },
  {
    rank: 3,
    courseId: 4,
    rankingListId: 3,
  },
  {
    rank: 4,
    courseId: 2,
    rankingListId: 3,
  },
  {
    rank: 5,
    courseId: 6,
    rankingListId: 3,
  },
  {
    rank: 6,
    courseId: 5,
    rankingListId: 3,
  },
]

async function seedRankings () {
  await publishers.forEach(async publisher => {
    await Publisher.create(publisher)
  })
  console.log(`Seeded ${publishers.length} Publisher names`)

  await rankingListNames.forEach(async rankingListName => {
    await RankingListName.create(rankingListName)
  })
  console.log(`Seeded ${rankingListNames.length} RankingList names`)

  const rankingListProms = rankingLists.map(rankingList => {
    return RankingList.create(rankingList)
  })
  await Promise.all(rankingListProms)
  console.log(`Seeded ${rankingLists.length} RankingLists`)

  const rankingProms = rankings.map(ranking => {
    return Ranking.create(ranking)
  })
  await Promise.all(rankingProms)
  console.log(`Seeded ${rankings.length} Rankings`)
}

module.exports = seedRankings

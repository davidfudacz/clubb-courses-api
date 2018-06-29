const { Publisher, Ranking, List } = require('../../server/db/models')

const publishers = [
  {
    id: 1,
    name: 'Golf Digest Magazine',
    informal: 'Golf Digest',
  },
  {
    id: 2,
    name: 'Golfweek Magazine',
    informal: 'Golfweek',
  },
  {
    id: 3,
    name: 'Golf Magazine',
    informal: 'Golf',
  }
]

const lists = [
  {
    name: 'Top 100 Courses in the United States',
    informal: 'Top 100 (US)',
    year: 2017,
    publisherId: 3,
  },
  {
    name: `America's 100 Greatest Public Courses`,
    informal: 'Top 100 Public (US)',
    year: 2017,
    publisherId: 1,
  },
  {
    name: 'Top 100 Classic Courses',
    informal: 'Top 100 Classic',
    year: 2017,
    publisherId: 2,
  },
]

const rankings = [
  {
    rank: 1,
    courseId: 1,
    listId: 1,
  },
  {
    rank: 2,
    courseId: 2,
    listId: 1,
  },
  {
    rank: 3,
    courseId: 3,
    listId: 1,
  },
  {
    rank: 4,
    courseId: 4,
    listId: 1,
  },
  {
    rank: 5,
    courseId: 5,
    listId: 1,
  },
  {
    rank: 6,
    courseId: 6,
    listId: 1,
  },
  {
    rank: 1,
    courseId: 2,
    listId: 2,
  },
  {
    rank: 2,
    courseId: 1,
    listId: 2,
  },
  {
    rank: 3,
    courseId: 4,
    listId: 2,
  },
  {
    rank: 4,
    courseId: 3,
    listId: 2,
  },
  {
    rank: 5,
    courseId: 5,
    listId: 2,
  },
  {
    rank: 6,
    courseId: 6,
    listId: 2,
  },
  {
    rank: 1,
    courseId: 3,
    listId: 3,
  },
  {
    rank: 2,
    courseId: 1,
    listId: 3,
  },
  {
    rank: 3,
    courseId: 4,
    listId: 3,
  },
  {
    rank: 4,
    courseId: 2,
    listId: 3,
  },
  {
    rank: 5,
    courseId: 6,
    listId: 3,
  },
  {
    rank: 6,
    courseId: 5,
    listId: 3,
  },
]

async function seedRankings () {
  const publisherProms = publishers.map(publisher => {
    return Publisher.create(publisher)
  })
  await Promise.all(publisherProms)
  console.log(`Seeded ${publishers.length} Publisher names`)

  const listProms = lists.map(list => {
    return List.create(list)
  })
  await Promise.all(listProms)
  console.log(`Seeded ${lists.length} Lists`)

  const rankingProms = rankings.map(ranking => {
    return Ranking.create(ranking)
  })
  await Promise.all(rankingProms)
  console.log(`Seeded ${rankings.length} Rankings`)
}

module.exports = seedRankings

const router = require('express').Router()
const {
  RankingList,
  RankingListName,
  Publisher,
} = require('../../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.rankingList = await RankingList.findById(id, {
      include: [ RankingListName, Publisher ]
    })
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const rankingLists = await RankingList.findAll({
      include: [ RankingListName, Publisher ]
    })
    const response = rankingLists.map(rankingList => {
      const { id, year, rankingListName, publisher } = rankingList
      return {
        id,
        year,
        rankingListName: {
          id: rankingListName.id,
          name: rankingListName.name,
          informal: rankingListName.informal,
        },
        publisher: {
          id: publisher.id,
          name: publisher.name,
          informal: publisher.informal,
        }
      }
    })
    res.json(response)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  const { id, year, rankingListName, publisher } = req.rankingList

  const response = {
    id,
    year,
    rankingListName: {
      id: rankingListName.id,
      name: rankingListName.name,
      informal: rankingListName.informal,
    },
    publisher: {
      id: publisher.id,
      name: publisher.name,
      informal: publisher.informal,
    }
  }
  res.json(response)
})

router.post('/', async (req, res, next) => {
  try {
    const rankingList = await RankingList.create(req.body)
    res.json(rankingList)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedRankingList = await RankingList.update(req.body, {
      where: {
        id: req.rankingList.id,
      },
      returning: true,
    })
    const returningRankingList = updatedRankingList[1][0]
    res.json(returningRankingList)
  }
  catch (err) {
    next(err)
  }
})

router.use('/:id/rankings', require('./rankings'))

module.exports = router

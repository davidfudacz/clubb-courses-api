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
    res.json(rankingLists)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  console.log(req.rankingList)
  res.json(req.rankingList)
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

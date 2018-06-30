const router = require('express').Router()
const { RankingList, Publisher, RankingListName } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const publisherId = req.publisher.id
    const rankingLists = await RankingList.findAll({
      include: [
        {
          model: Publisher,
          where: {
            id: publisherId
          },
          attributes: ['id'],
        },
        RankingListName
      ]
    })
    const response = rankingLists.map(({ id, year, rankingListName }) => {
      const { id: rankingListNameId, name, informal } = rankingListName ? rankingListName : null
      return {
        id,
        year,
        rankingListName: {
          id: rankingListNameId,
          name,
          informal
        },
      }
    })
    res.json(response)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const publisherId = req.publisher.id
    const rankingList = await RankingList.create(req.body)
    await rankingList.addPublisher(publisherId)
    res.json(rankingList)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router

const router = require('express').Router()
const { Ranking, Course, Club, Build } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const listId = req.list.id
    const rankings = await Ranking.findAll({
      where: {
        listId
      },
      include: [
        {
        model: Course,
        include: [ Club, Build ]
        },
      ]
    })

    const yearOriginallyBuilt = (buildsArr) => {
      let yearBuilt = null
      for (let i = 0; i < buildsArr.length; i++) {
        if (buildsArr[i].buildType === 'original') {
          yearBuilt = buildsArr[i].year
        }
      }
      return yearBuilt
    }

    const response = rankings.map(ranking => {
      const { id, rank, course } = ranking
      const { club, builds } = course

      return {
        id,
        rank,
        course: {
          id: course.id,
          name: course.name,
          informal: course.informal,
          club: {
            id: club.id,
            name: club.name,
            informal: club.informal,
            established: club.established,
          },
          yearOriginallyBuilt: yearOriginallyBuilt(builds),
        }
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
    const ranking = await Ranking.create(req.body)
    await ranking.setList(req.list.id)
    res.json(ranking)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedRanking = await Ranking.update(req.body, {
      where: {
        id: req.ranking.id,
      },
      returning: true,
    })
    const returningRanking = updatedRanking[1][0]
    res.json(returningRanking)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router

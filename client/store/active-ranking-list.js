import axios from 'axios'
import { getRankingsFromServerThunkerator } from '../store'

//actions
const GET_RANKING_LIST_FROM_SERVER = 'GET_RANKING_LIST_FROM_SERVER'
const CLEAR_RANKING_LIST = 'CLEAR_RANKING_LIST'

//action creators
export const getRankingListFromServer = rankingList => ({
  type: GET_RANKING_LIST_FROM_SERVER,
  rankingList,
})

export const clearRankingList = () => ({
  type: CLEAR_RANKING_LIST,
})

//thunks
export const getRankingListFromServerThunkerator = (id) => {
  return async (dispatch) => {
    try {
      const rankingList = await axios.get(`/api/ranking-lists/${id}`)
      dispatch(getRankingListFromServer(rankingList.data))
      dispatch(getRankingsFromServerThunkerator(id))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = {}, action) => {
  switch (action.type) {
    case GET_RANKING_LIST_FROM_SERVER:
      return action.rankingList
    case CLEAR_RANKING_LIST:
      return {}
    default:
      return prevState
  }
}

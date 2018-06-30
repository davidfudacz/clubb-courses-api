import axios from 'axios'

//actions
const GET_RANKINGS_FROM_SERVER = 'GET_RANKINGS_FROM_SERVER'
const CLEAR_RANKINGS = 'CLEAR_RANKINGS'

//action creators
export const getRankingsFromServer = rankings => ({
  type: GET_RANKINGS_FROM_SERVER,
  rankings,
})

export const clearRankings = () => ({
  type: CLEAR_RANKINGS,
})

//thunks
export const getRankingsFromServerThunkerator = (rankingListId) => {
  return async (dispatch) => {
    const rankings = await axios.get(`/api/ranking-lists/${rankingListId}/rankings`)
    dispatch(getRankingsFromServer(rankings.data))
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case GET_RANKINGS_FROM_SERVER:
      return action.rankings
    case CLEAR_RANKINGS:
      return []
    default:
      return prevState
  }
}

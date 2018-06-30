import axios from 'axios'

//actions
const GET_ALL_RANKING_LISTS_FROM_SERVER = 'GET_ALL_RANKING_LISTS_FROM_SERVER'
const ADD_RANKING_LIST_FROM_SERVER = 'ADD_RANKING_LIST_FROM_SERVER'
const CLEAR_RANKING_LISTS = 'CLEAR_RANKING_LISTS'

//action creators
export const getAllRankingListsFromServer = rankingLists => ({
  type: GET_ALL_RANKING_LISTS_FROM_SERVER,
  rankingLists,
})

export const addRankingListFromServer = rankingList => ({
  type: ADD_RANKING_LIST_FROM_SERVER,
  rankingList,
})

export const clearRankingLists = () => ({
  type: CLEAR_RANKING_LISTS,
})

//thunks
export const getAllRankingListsFromServerThunkerator = () => {
  return async (dispatch) => {
    const rankingLists = await axios.get('/api/ranking-lists')
    dispatch(getAllRankingListsFromServer(rankingLists.data))
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case GET_ALL_RANKING_LISTS_FROM_SERVER:
      return action.rankingLists
    case ADD_RANKING_LIST_FROM_SERVER:
      return [...prevState, action.rankingList]
    case CLEAR_RANKING_LISTS:
      return []
    default:
      return prevState
  }
}

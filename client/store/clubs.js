import axios from 'axios'

//actions
const GET_ALL_CLUBS_FROM_SERVER = 'GET_ALL_CLUBS_FROM_SERVER'
const ADD_CLUB_FROM_SERVER = 'ADD_CLUB_FROM_SERVER'
const CLEAR_CLUBS = 'CLEAR_CLUBS'

//action creators
export const getAllClubsFromServer = clubs => ({
  type: GET_ALL_CLUBS_FROM_SERVER,
  clubs,
})

export const addClubFromServer = club => ({
  type: ADD_CLUB_FROM_SERVER,
  club,
})

export const clearClubs = () => ({
  type: CLEAR_CLUBS,
})

//thunks
export const getAllClubsFromServerThunkerator = () => {
  return async (dispatch) => {
    const clubs = await axios.get('/api/clubs')
    dispatch(getAllClubsFromServer(clubs.data))
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case GET_ALL_CLUBS_FROM_SERVER:
      return action.clubs
    case ADD_CLUB_FROM_SERVER:
      return [...prevState, action.club]
    case CLEAR_CLUBS:
      return []
    default:
      return prevState
  }
}

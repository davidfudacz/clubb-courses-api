import axios from 'axios'

//actions
const GET_CLUB_FROM_SERVER = 'GET_CLUB_FROM_SERVER'
const CLEAR_CLUB = 'CLEAR_CLUB'

//action creators
export const getClubFromServer = club => ({
  type: GET_CLUB_FROM_SERVER,
  club,
})

export const clearClub = () => ({
  type: CLEAR_CLUB,
})

//thunks
export const getClubFromServerThunkerator = (id) => {
  return async (dispatch) => {
    try {
      const club = await axios.get(`/api/clubs/${id}`)
      dispatch(getClubFromServer(club.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = {}, action) => {
  switch (action.type) {
    case GET_CLUB_FROM_SERVER:
      return action.club
    case CLEAR_CLUB:
      return {}
    default:
      return prevState
  }
}

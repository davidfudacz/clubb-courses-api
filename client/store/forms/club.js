import axios from 'axios'

//actions
const GET_CLUB_FORM_FROM_SERVER = 'GET_CLUB_FORM_FROM_SERVER'
const CLEAR_CLUB_FORM = 'CLEAR_CLUB_FORM'

//action creators
export const getClubFormFromServer = club => ({
  type: GET_CLUB_FORM_FROM_SERVER,
  club,
})

export const clearClubForm = () => ({
  type: CLEAR_CLUB_FORM,
})

//thunks
export const postClubFormToServerThunkerator = (body) => {
  return async (dispatch) => {
    try {
      const club = await axios.post(`/api/clubs`, body)
      dispatch(getClubFormFromServer(club.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = {}, action) => {
  switch (action.type) {
    case GET_CLUB_FORM_FROM_SERVER:
      return action.club
    case CLEAR_CLUB_FORM:
      return {}
    default:
      return prevState
  }
}

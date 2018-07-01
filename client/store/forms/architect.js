import axios from 'axios'

//actions
const GET_ARCHITECT_FROM_SERVER = 'GET_ARCHITECT_FROM_SERVER'
const CLEAR_ARCHITECT = 'CLEAR_ARCHITECT'

//action creators
export const getArchitectFromServer = architect => ({
  type: GET_ARCHITECT_FROM_SERVER,
  architect,
})

export const clearArchitect = () => ({
  type: CLEAR_ARCHITECT,
})

//thunks
export const postArchitectToServerThunkerator = (body) => {
  return async (dispatch) => {
    try {
      const architect = await axios.post(`/api/architects`, body)
      dispatch(getArchitectFromServer(architect.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = {}, action) => {
  switch (action.type) {
    case GET_ARCHITECT_FROM_SERVER:
      return action.architect
    case CLEAR_ARCHITECT:
      return {}
    default:
      return prevState
  }
}

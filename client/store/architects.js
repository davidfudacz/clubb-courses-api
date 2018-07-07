import axios from 'axios'

//actions
const GET_ALL_ARCHITECTS_FROM_SERVER = 'GET_ALL_ARCHITECTS_FROM_SERVER'
const ADD_ARCHITECT_FROM_SERVER = 'ADD_ARCHITECT_FROM_SERVER'
const CLEAR_ARCHITECTS = 'CLEAR_ARCHITECTS'

//action creators
export const getAllArchitectsFromServer = architects => ({
  type: GET_ALL_ARCHITECTS_FROM_SERVER,
  architects,
})

export const addArchitectFromServer = architect => ({
  type: ADD_ARCHITECT_FROM_SERVER,
  architect,
})

export const clearArchitects = () => ({
  type: CLEAR_ARCHITECTS,
})

//thunks
export const getAllArchitectsFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const architects = await axios.get('/api/architects')
      dispatch(getAllArchitectsFromServer(architects.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case GET_ALL_ARCHITECTS_FROM_SERVER:
      return action.architects
    case ADD_ARCHITECT_FROM_SERVER:
      return [...prevState, action.architect]
    case CLEAR_ARCHITECTS:
      return []
    default:
      return prevState
  }
}

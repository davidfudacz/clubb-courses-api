import axios from 'axios'

//actions
const GET_ALL_STATES_FROM_SERVER = 'GET_ALL_STATES_FROM_SERVER'
const ADD_STATE_FROM_SERVER = 'ADD_STATE_FROM_SERVER'
const CLEAR_STATES = 'CLEAR_STATES'

//action creators
export const getAllStatesFromServer = states => ({
  type: GET_ALL_STATES_FROM_SERVER,
  states,
})

export const addStateFromServer = state => ({
  type: ADD_STATE_FROM_SERVER,
  state,
})

export const clearStates = () => ({
  type: CLEAR_STATES,
})

//thunks
export const getAllStatesFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const states = await axios.get('/api/states')
      dispatch(getAllStatesFromServer(states.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case GET_ALL_STATES_FROM_SERVER:
      return action.states
    case ADD_STATE_FROM_SERVER:
      return [...prevState, action.state]
    case CLEAR_STATES:
      return []
    default:
      return prevState
  }
}

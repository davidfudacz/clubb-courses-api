import axios from 'axios'

//actions
const GET_ARCHITECT_FORM_FROM_SERVER = 'GET_ARCHITECT_FORM_FROM_SERVER'
const CLEAR_ARCHITECT_FORM = 'CLEAR_ARCHITECT_FORM'

//action creators
export const getArchitectFormFromServer = architect => ({
  type: GET_ARCHITECT_FORM_FROM_SERVER,
  architect,
})

export const clearArchitectForm = () => ({
  type: CLEAR_ARCHITECT_FORM,
})

//thunks
export const postArchitectFormToServerThunkerator = (body) => {
  return async (dispatch) => {
    try {
      const architect = await axios.post(`/api/architects`, body)
      dispatch(getArchitectFormFromServer(architect.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = {}, action) => {
  switch (action.type) {
    case GET_ARCHITECT_FORM_FROM_SERVER:
      return action.architect
    case CLEAR_ARCHITECT_FORM:
      return {}
    default:
      return prevState
  }
}

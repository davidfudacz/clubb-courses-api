import axios from 'axios'

//actions
const GET_COURSE_FORM_FROM_SERVER = 'GET_COURSE_FORM_FROM_SERVER'
const CLEAR_COURSE_FORM = 'CLEAR_COURSE_FORM'

//action creators
export const getCourseFormFromServer = course => ({
  type: GET_COURSE_FORM_FROM_SERVER,
  course,
})

export const clearCourseForm = () => ({
  type: CLEAR_COURSE_FORM,
})

//thunks
export const postCourseFormToServerThunkerator = (body) => {
  return async (dispatch) => {
    try {
      body.architects = body.architects.map(({id}) => +id)
      const {
        clubId,
        name,
        informal,
        numOfHoles,
        year,
        architects,
      } = body
      const courseBody = {
        name,
        informal,
        numOfHoles,
      }
      const buildBody = {
        buildType: 'original',
        year,
        numOfHoles,
      }
      const course = await axios.post(`/api/clubs/${clubId}/courses`, courseBody)
      const build = await axios.post(`/api/courses/${course.data.id}/builds`, buildBody)
      await axios.post(`/api/courses/${course.data.id}/builds/${build.data.id}/architects`, architects)
      dispatch(getCourseFormFromServer(course.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = {}, action) => {
  switch (action.type) {
    case GET_COURSE_FORM_FROM_SERVER:
      return action.course
    case CLEAR_COURSE_FORM:
      return {}
    default:
      return prevState
  }
}

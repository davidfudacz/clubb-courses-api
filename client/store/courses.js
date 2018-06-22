import axios from 'axios'

//actions
const GET_ALL_COURSES_FROM_SERVER = 'GET_ALL_COURSES_FROM_SERVER'
const ADD_COURSE_FROM_SERVER = 'ADD_COURSE_FROM_SERVER'

//action creators
export const getAllCoursesFromServer = courses => ({
  type: GET_ALL_COURSES_FROM_SERVER,
  courses,
})

export const addCourseFromServer = course => ({
  type: ADD_COURSE_FROM_SERVER,
  course,
})

//thunks
export const getAllCoursesFromServerThunkerator = () => {
  return async (dispatch) => {
    const courses = await axios.get('/api/courses')
    dispatch(getAllCoursesFromServer(courses.data))
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case GET_ALL_COURSES_FROM_SERVER:
      return action.courses
    case ADD_COURSE_FROM_SERVER:
      return [...prevState, action.course]
    default:
      return prevState
  }
}

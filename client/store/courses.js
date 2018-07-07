import axios from 'axios'

//actions
const GET_ALL_COURSES_FROM_SERVER = 'GET_ALL_COURSES_FROM_SERVER'
const ADD_COURSE_FROM_SERVER = 'ADD_COURSE_FROM_SERVER'
const CLEAR_COURSES = 'CLEAR_COURSES'

//action creators
export const getAllCoursesFromServer = courses => ({
  type: GET_ALL_COURSES_FROM_SERVER,
  courses,
})

export const addCourseFromServer = course => ({
  type: ADD_COURSE_FROM_SERVER,
  course,
})

export const clearCourses = () => ({
  type: CLEAR_COURSES,
})

//thunks
export const getAllCoursesFromServerThunkerator = () => {
  return async (dispatch) => {
    try {
      const courses = await axios.get('/api/courses')
      dispatch(getAllCoursesFromServer(courses.data))
    }
    catch (err) {
      console.log(err)
    }
  }
}

//reducer
export default (prevState = [], action) => {
  switch (action.type) {
    case GET_ALL_COURSES_FROM_SERVER:
      return action.courses
    case ADD_COURSE_FROM_SERVER:
      return [...prevState, action.course]
    case CLEAR_COURSES:
      return []
    default:
      return prevState
  }
}

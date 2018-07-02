import { combineReducers } from 'redux'
import architect from './architect'
import club from './club'
import course from './course'

const reducer = combineReducers({
  architect,
  club,
  course,
})

export default reducer
export * from './architect'
export * from './club'
export * from './course'

import { combineReducers } from 'redux'
import architect from './architect'
import club from './club'

const reducer = combineReducers({
  architect,
  club,
})

export default reducer
export * from './architect'
export * from './club'

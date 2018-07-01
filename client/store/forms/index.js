import { combineReducers } from 'redux'
import architect from './architect'

const reducer = combineReducers({
  architect,
})

export default reducer
export * from './architect'

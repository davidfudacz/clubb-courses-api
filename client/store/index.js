import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import clubs from './clubs'
import courses from './courses'
import activeClub from './active-club'

const reducer = combineReducers({
  user,
  clubs,
  courses,
  activeClub,
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: false})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './clubs'
export * from './courses'
export * from './active-club'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as formReducer } from 'redux-form'
import user from './user'
import clubs from './clubs'
import courses from './courses'
import architects from './architects'
import activeClub from './active-club'
import rankingLists from './ranking-lists'
import activeRankingList from './active-ranking-list'
import activeRankings from './active-rankings'
import forms from './forms'

const reducer = combineReducers({
  user,
  clubs,
  courses,
  architects,
  activeClub,
  rankingLists,
  activeRankingList,
  activeRankings,
  form: formReducer,
  forms,
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
export * from './architects'
export * from './active-club'
export * from './ranking-lists'
export * from './active-ranking-list'
export * from './active-rankings'
export * from './forms'

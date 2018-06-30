import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import clubs from './clubs'
import courses from './courses'
import activeClub from './active-club'
import rankingLists from './ranking-lists'
import activeRankingList from './active-ranking-list'
import activeRankings from './active-rankings'

const reducer = combineReducers({
  user,
  clubs,
  courses,
  activeClub,
  rankingLists,
  activeRankingList,
  activeRankings,
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
export * from './ranking-lists'
export * from './active-ranking-list'
export * from './active-rankings'

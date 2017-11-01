import { combineReducers } from 'redux'
import projectsPage from './pages/projects/reducer'
import projectPage from './pages/project/reducer'
import boardPage from './pages/board/reducer'
import search from './global/search/reducer'
import currentUser from './global/currentUser/reducer'

const rootReducer = combineReducers({
  projectsPage,
  projectPage,
  boardPage,
  search,
  currentUser,
})

export default rootReducer

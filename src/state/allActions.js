import * as shared from './shared/actions'
import * as currentUser from './global/currentUser/actions'
import * as search from './global/search/actions'
import * as pages from './pages/actions'
import * as projects from './pages/projects/actions'
import * as project from './pages/project/actions'
import * as board from './pages/board/actions'

export default {
  ...shared,
  ...currentUser,
  ...search,
  ...pages,
  ...projects,
  ...project,
  ...board,
}

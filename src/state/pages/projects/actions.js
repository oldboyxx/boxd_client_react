import types from 'state/constants/actionTypes'
import api, { handleError } from 'api/request'

export const $getProjectsPage = (query, cb) => dispatch => (
  api.get('/projects', query, cb).then(data => {
    dispatch({ type: types.PAGE_PROJECTS_RECEIVE, data, query })
  }, handleError)
)

export const $createProject = (send, cb) => dispatch => (
  api.post('/projects', send, cb).then(() => {}, handleError)
)

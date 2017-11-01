import types from 'state/constants/actionTypes'
import api, { handleError } from 'api/request'

export const $getProjectPage = (id, query, cb) => dispatch => (
  api.get('/projects/'+id, query, cb).then(data => {
    dispatch({ type: types.PAGE_PROJECT_RECEIVE, data, query })
  }, handleError)
)

export const $updateProject = (id, send, cb) => dispatch => (
  api.put('/projects/'+id, send, cb).then(data => {
    dispatch({ type: types.PROJECT_UPDATE, data })
  }, handleError)
)

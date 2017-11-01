import types from 'state/constants/actionTypes'
import api, { handleError } from 'api/request'

export const $getCurrentUser = (query, cb) => dispatch => (
  api.get('/settings', query, cb).then(data => {
    dispatch({ type: types.CURRENT_USER_RECEIVE, data, query })
  }, handleError)
)

export const $updateCurrentUser = (send, cb) => dispatch => (
  api.put('/settings', send, cb).then(data => {
    dispatch({ type: types.CURRENT_USER_UPDATE, data })
  }, handleError)
)

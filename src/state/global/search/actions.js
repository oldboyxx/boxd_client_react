import types from 'state/constants/actionTypes'
import api, { handleError } from 'api/request'

export const $search = (query, cb) => dispatch => (
  api.get('/tasks', query, cb).then(data => {
    dispatch({ type: types.SEARCH_RECEIVE, data, query })
  }, handleError)
)

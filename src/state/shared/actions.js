import types from 'state/constants/actionTypes'
import api, { handleError } from 'api/request'

export const $createBoard = (send, cb) => dispatch => (
  api.post('/boards', send, cb).then(() => {}, handleError)
)

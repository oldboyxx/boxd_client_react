import types from 'state/constants/actionTypes'
import api, { handleError } from 'api/request'

export const filterTasksByUser = userID => ({
  type: types.TASKS_FILTER_BY_USER, userID
})

export const filterTasksByLabel = labelID => ({
  type: types.TASKS_FILTER_BY_LABEL, labelID
})

export const resetTask = () => ({
  type: types.TASK_RESET
})


export const $getBoardPage = (id, query, cb) => dispatch => (
  api.get('/boards/'+id, query, cb).then(data => {
    dispatch({ type: types.PAGE_BOARD_RECEIVE, data, query })
  }, handleError)
)

export const $updateBoard = (id, send, cb) => dispatch => (
  api.put('/boards/'+id, send, cb).then(data => {
    dispatch({ type: types.BOARD_UPDATE, data })
  }, handleError)
)

export const $createList = (send, cb) => dispatch => (
  api.post('/lists', send, cb).then(data => {
    dispatch({ type: types.LIST_CREATE, data })
  }, handleError)
)

export const $updateList = (id, send, cb) => dispatch => (
  api.put('/lists/'+id, send, cb).then(data => {
    dispatch({ type: types.LIST_UPDATE, data })
  }, handleError)
)

export const $archieveList = (id, send, cb) => dispatch => (
  api.put('/lists/'+id, send, cb).then(data => {
    dispatch({ type: types.LIST_ARCHIEVE, data })
  }, handleError)
)

export const $moveList = (id, send = {}, cb) => dispatch => {
  dispatch({ type: types.LIST_MOVE, data: { id, ...send }})
  return api.put('/lists/'+id, send, cb).then(() => {}, handleError)
}

export const $createTask = (send, cb) => dispatch => (
  api.post('/tasks', send, cb).then(data => {
    dispatch({ type: types.TASK_CREATE, data })
  }, handleError)
)

export const $updateTask = (id, send, cb) => dispatch => (
  api.put('/tasks/'+id, send, cb).then(data => {
    dispatch({ type: types.TASK_UPDATE, data })
  }, handleError)
)

export const $archieveTask = (id, send, cb) => dispatch => (
  api.put('/tasks/'+id, send, cb).then(data => {
    dispatch({ type: types.TASK_ARCHIEVE, data })
  }, handleError)
)

export const $moveTask = (id, send = {}, cb) => dispatch => {
  dispatch({ type: types.TASK_MOVE, data: { id, ...send }})
  return api.put('/tasks/'+id, send, cb).then(() => {}, handleError)
}

export const $getTaskPage = (id, query, cb) => dispatch => (
  api.get('/tasks/'+id, query, cb).then(data => {
    dispatch({ type: types.PAGE_TASK_RECEIVE, data, query })
  }, handleError)
)

export const $createComment = (send, cb) => dispatch => (
  api.post('/comments', send, cb).then(data => {
    dispatch({ type: types.COMMENT_CREATE, data })
  }, handleError)
)

export const $updateComment = (id, send, cb) => dispatch => (
  api.put('/comments/'+id, send, cb).then(data => {
    dispatch({ type: types.COMMENT_UPDATE, data })
  }, handleError)
)

export const $deleteComment = (id, send, cb) => dispatch => (
  api.delete('/comments/'+id, send, cb).then(data => {
    dispatch({ type: types.COMMENT_DELETE, data })
  }, handleError)
)

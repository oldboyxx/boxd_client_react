import _ from 'lodash'
import { update, toggle } from 'utils/collection'
import types from 'state/constants/actionTypes'

const initialState = {
  project: {},
  board: {},
  lists: [],
  tasks: [],
  users: [],

  task: {}, // Task overlay

  filters: {
    users: [],
    labels: [],
  },
  query: {
    archieved_lists: false,
    archieved_tasks: false,
  },
}

const boardPage = (state = initialState, action) => {
  const ad = action.data
  switch (action.type) {

    case types.PAGE_CHANGE:
      return initialState

    case types.PAGE_BOARD_RECEIVE:
      var { project, board, lists, tasks, users } = ad
      var { query } = action
      return {
        ...state,
        project,
        board,
        lists,
        tasks,
        users,
        query
      }

    case types.BOARD_UPDATE:
      return { ...state, board: ad.board }

    case types.LIST_CREATE:
      return { ...state, lists: [ ...state.lists, ad.list ]}
    case types.LIST_UPDATE:
      return { ...state, lists: update(state.lists, ad.list, { _id: ad.list._id })}
    case types.LIST_ARCHIEVE:
      return { ...state, lists: _.reject(state.lists, { _id: ad.list._id })}

    case types.TASK_CREATE:
      return { ...state, tasks: [ ...state.tasks, ad.task ]}

    case types.TASK_UPDATE:
      var tasks = update(state.tasks, ad.task, { _id: ad.task._id })
      var task = _.isEmpty(state.task) ? state.task : ad.task // Task overlay
      return { ...state, tasks, task}

    case types.TASK_ARCHIEVE:
      var tasks = _.reject(state.tasks, { _id: ad.task._id })
      var task = _.isEmpty(state.task) ? state.task : ad.task // Task overlay

      // Task overlay - restore task
      if (!_.isEmpty(task) &&
         (!state.archieved_tasks && !ad.task.archieved) ||
         (state.archieved_tasks && ad.task.archieved)) {
        tasks = [ ...tasks, task ]
      }

      return { ...state, tasks, task}

    case types.TASKS_FILTER_BY_USER:
      var users = toggle(state.filters.users, action.userID)
      return { ...state, filters: { ...state.filters, users} }

    case types.TASKS_FILTER_BY_LABEL:
      var labels = toggle(state.filters.labels, action.labelID)
      return { ...state, filters: { ...state.filters, labels} }

    case types.LIST_MOVE:
      var list = _.find(state.lists, { _id: ad.id })
      list = { ...list, position: ad.position }
      return { ...state, lists: update(state.lists, list, { _id: ad.id })}

    case types.TASK_MOVE:
      var task = _.find(state.tasks, { _id: ad.id })
      task = { ...task, position: ad.position, list_id: ad.list_id }
      return { ...state, tasks: update(state.tasks, task, { _id: ad.id })}

    // Task overlay
    case types.TASK_RESET:
      return { ...state, task: {} }
    case types.PAGE_TASK_RECEIVE:
      return { ...state, task: ad.task }

    case types.COMMENT_CREATE:
    case types.COMMENT_UPDATE:
    case types.COMMENT_DELETE:
      var tasks = update(state.tasks, ad.task, { _id: ad.task._id })
      return { ...state, tasks, task: ad.task }

    default:
      return state
  }
}

export default boardPage

import _ from 'lodash'
import { createSelector } from 'reselect'

export const getFilteredAndSortedTasks = createSelector(
  state => state.filters,
  state => state.tasks,
  (filters, tasks) => {

    tasks = !filters.users.length ? tasks : _.filter(tasks, task => (
      _.intersection(filters.users, task.users).length
    ))

    tasks = !filters.labels.length ? tasks : _.filter(tasks, task => (
      _.intersection(filters.labels, task.labels).length
    ))

    return _.sortBy(tasks, 'position')
  }
)

export const getSortedLists = createSelector(
  state => state.lists,
  lists => _.sortBy(lists, 'position')
)

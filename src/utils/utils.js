import _ from 'lodash'
import moment from 'moment'

export const calcFixedPosition = (anchor, { width, height }) => {
  const rect = anchor.getBoundingClientRect()
  let left = rect.left
  let top = rect.bottom+10

  if (left + width + 15 > window.innerWidth) {
    left = window.innerWidth - width - 15
  }
  if (top + height + 15 > window.innerHeight) {
    top = window.innerHeight - height - 15
  }
  return { top, left }
}

export const calcDueDate = (date, { longFormat=false } = {}) => {
  let dueClass = ''
  let dueFormat = 'MMM DD'

  if (date) {
    if (moment().subtract(1, 'days').isAfter(date)) {
      dueClass = ' is-past'
      if (longFormat) dueFormat = 'MMM DD [(past due)]'

    } else if (moment().isAfter(date)) {
      dueClass = ' is-past-soon'
      if (longFormat) dueFormat = 'MMM DD [(today)]'
    }
  }
  return { dueClass, dueFormat }
}

export const isAdmin = (user, object) => (
  !!_.find(object.users, { _id: user._id, admin: true })
)

import _ from 'lodash'

export const sortByAlphabet = (arr, match) => (
  _.sortBy(arr, el => el[match].toLowerCase())
)

const getIndex = (arr, val, matchVal) => {
  arr = arr.slice(0)
  matchVal = matchVal ? _.find(arr, matchVal) : val
  const index = _.indexOf(arr, matchVal)
  return { arr, val, index }
}

export const update = (...args) => {
  let { arr, val, index } = getIndex(...args)
  if (index > -1) arr.splice(index, 1, val)
  return arr
}

export const toggle = (...args) => {
  let { arr, val, index } = getIndex(...args)
  index > -1 ? arr.splice(index, 1) : arr.push(val)
  return arr
}

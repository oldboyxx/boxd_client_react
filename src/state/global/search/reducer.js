import types from 'state/constants/actionTypes'

const initialState = {
  tasks: []
}

const search = (state = initialState, action) => {
  const ad = action.data
  switch (action.type) {

    case types.SEARCH_RECEIVE:
      return { tasks: ad.tasks }

    default:
      return state
  }
}

export default search

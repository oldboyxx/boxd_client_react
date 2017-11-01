import types from 'state/constants/actionTypes'

const initialState = {
  project: {},
  boards: [],
  users: [],
  query: {
    archieved_boards: false
  }
}

const projectPage = (state = initialState, action) => {
  const ad = action.data
  switch (action.type) {

    case types.PAGE_CHANGE:
      return initialState

    case types.PAGE_PROJECT_RECEIVE:
      var { project, boards, users } = ad
      var { query } = action
      return {
        ...state,
        project,
        boards,
        users,
        query
      }

    case types.PROJECT_UPDATE:
      var users = ad.added_user ? [...state.users, ad.added_user] : state.users
      return { ...state, project: ad.project, users }

    default:
      return state
  }
}

export default projectPage

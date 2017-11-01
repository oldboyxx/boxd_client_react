import types from 'state/constants/actionTypes'

const initialState = {
  projects: [],
  boards: [],
  pageIsReady: false,
  query: {
    archieved_projects: false
  }
}

const projectsPage = (state = initialState, action) => {
  const ad = action.data
  switch (action.type) {

    case types.PAGE_CHANGE:
      return initialState

    case types.PAGE_PROJECTS_RECEIVE:
      var { projects, boards } = ad
      var { query } = action
      return {
        ...state,
        projects,
        boards,
        query,
        pageIsReady: true
      }

    default:
      return state
  }
}

export default projectsPage

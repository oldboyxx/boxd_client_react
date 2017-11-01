import types from 'state/constants/actionTypes'

const currentUser = (state = {}, action) => {
  const ad = action.data

  // API allows any request to return current user
  if (ad && ad.current_user) {
    return ad.current_user
  }

  switch (action.type) {
    case types.CURRENT_USER_RECEIVE:
    case types.CURRENT_USER_UPDATE:
      return ad.user

    default:
      return state
  }
}

export default currentUser

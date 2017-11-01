import config from 'config'

export const isUserAuthenticated = () => (
  localStorage.token || config.becomeDevUser
)

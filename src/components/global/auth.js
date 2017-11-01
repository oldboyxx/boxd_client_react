import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pubsub from 'sweet-pubsub'
import queryString from 'query-string'
import { withRouter, Redirect } from 'react-router-dom'
import { isUserAuthenticated } from 'utils/auth'

const propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

class Auth extends Component {

  componentWillMount() {
    this.storeTokenFromUrl()
    pubsub.on('logout', this.handleLogout)
    pubsub.on('tokenError', this.handleTokenError)
  }

  componentWillUnmount() {
    pubsub.off('logout', this.handleLogout)
    pubsub.off('tokenError', this.handleTokenError)
  }

  storeTokenFromUrl = () => {
    const { pathname, search } = this.props.location
    const query = queryString.parse(search)

    if (!query.jwtoken) return

    localStorage.token = query.jwtoken
    if (query.test) localStorage.testToken = query.jwtoken

    this.props.history.replace({
      pathname,
      search: queryString.stringify(
        _.omit(query, ['test', 'jwtoken'])
      )
    })
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    this.forceUpdate()
  }

  handleTokenError = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('testToken')
    this.forceUpdate()
  }

  render() {
    if (isUserAuthenticated()) {
      return this.props.children

    } else if (this.props.location.pathname !== '/login') {
      return <Redirect to="/login" />
    }
    return null
  }
}

Auth.propTypes = propTypes

Auth = withRouter(Auth)

export default Auth

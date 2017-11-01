import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import config from 'config'
import { isUserAuthenticated } from 'utils/auth'

const propTypes = {}

class LoginPage extends Component {

  redirectToTestAccount = () => {
    localStorage.token = localStorage.testToken
    setTimeout(() => window.location = '/', 50)
  }

  render() {
    if (isUserAuthenticated()) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginPage">
        <div className="login">

          <h1 className="login_title">Welcome to Boxd</h1>
          <p className="login_desc">
            This simple Trello clone was built with React/Redux, it's coupled with a Node/Mongo API, and everything lives on a DigitalOcean droplet.
          </p>

          {localStorage.testToken ? (
            <div className="login_test button" onClick={this.redirectToTestAccount}>
              <i className="i-user-add" />
              ENTER AS GUEST
            </div>
          ) : (
            <a
              className="login_test button"
              href={config.apiURL+'/auth/test?origin='+config.appURL}
            >
              <i className="i-user-add" />
              ENTER AS GUEST
            </a>
          )}
          <div />
          <a
            className="login_google button"
            href={config.apiURL+'/auth/google?origin='+config.appURL}
          >
            <i className="i-google" />
            Or sign in with Google
          </a>

          <div className="login_links">
            <a
              href="https://github.com/oldboyxx/boxd_client_react"
              target="_blank"
              className="login_link"
            >
              Client Github (es6 - es8)
            </a>
            <a
              href="https://github.com/oldboyxx/boxd_api"
              target="_blank"
              className="login_link"
            >
              API Github (es5 - es6)
            </a>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = propTypes

export default LoginPage

import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pubsub from 'sweet-pubsub'
import { connect } from 'react-redux'
import { $getCurrentUser, $updateCurrentUser } from 'state/global/currentUser/actions'
import PageLoader from '../pageLoader'

const mapStateToProps = ({ currentUser }) => ({
  currentUser
})

const propTypes = {
  currentUser: PropTypes.object.isRequired,
}

class SettingsPage extends Component {

  submit = () => {
    this.props.dispatch($updateCurrentUser({
      name: this.$name.value,
      bio: this.$bio.value
    }, {
      success() {
        pubsub.emit('toast', 'success', 'Settings saved.')
      }
    }))
  }

  onKeyDown = e => {
    if (e.keyCode === 13) this.submit()
  }

  logout = () => {
    pubsub.emit('logout')
  }

  render() {
    return (
      <div className="settingsPage">

        <div className="settings cf">
          <h2 className="settings_title">Settings</h2>

          <label>Username</label>
          <input
            type="text"
            className="text-input"
            placeholder="Username"
            defaultValue={this.props.currentUser.name}
            ref={el => this.$name = el}
            onKeyDown={this.onKeyDown}
          />

          <label>Short bio/role</label>
          <input
            type="text"
            className="text-input"
            placeholder="Short bio/role"
            defaultValue={this.props.currentUser.bio}
            ref={el => this.$bio = el}
            onKeyDown={this.onKeyDown}
          />
          <div className="settings_submit button" onClick={this.submit}>Save</div>

          <div className="settings_logout" onClick={this.logout}>
            <i className="i-logout" />
            Logout
          </div>
        </div>
      </div>
    )
  }
}

SettingsPage.propTypes = propTypes

SettingsPage = PageLoader({
  pageName: 'settings',
  onMount(dispatch, params, query) {
    dispatch($getCurrentUser(query))
  },
  isReady: props => !_.isEmpty(props.currentUser)
})(SettingsPage)

SettingsPage = connect(mapStateToProps)(SettingsPage)

export default SettingsPage

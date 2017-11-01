import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { calcFixedPosition, isAdmin } from 'utils/utils'
import Avatar from './avatar'
import Popup from 'components/helpers/popup'
import actions from 'state/allActions'

const mapDispatchToProps = actions

const propTypes = {
  user: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
}

class ItemUser extends Component {

  state = {
    initialized: false,
    viewingPermissions: false,
  }

  init = () => {
    // Lazy init for better render performance
    if (!this.state.initialized) {
      this.setState({ initialized: true })
    }
  }

  toggleView = () => {
    this.setState({
      viewingPermissions: !this.state.viewingPermissions
    })
  }

  getCardPosition = () => (
    calcFixedPosition(this.itemUser, { width: 280, height: 180 })
  )

  update = (method, admin) => {
    const { user, itemType, item, history } = this.props
    const send = { [method+'_user']: user._id, admin }
    const action = this.props['$update'+_.upperFirst(itemType)]

    action(item._id, send, {
      success: () => {
        if (
          itemType !== 'task' &&
          method === 'remove' &&
          this.isCurrentUser()
        ) {
          history.push('/')
        }
      }
    })
  }

  removeFromItem = () => this.update('remove')
  setToAdmin = () => this.update('add', true)
  setToNormal = () => this.update('add', false)

  isCurrentUser = () => (
    this.props.user._id === this.props.currentUser._id
  )

  link() {
    let { user } = this.props
    return (
      <div
        className="itemUser"
        ref={el => this.itemUser = el}
        onMouseEnter={this.init}
      >
        <Avatar avatarURL={user.avatar.url} name={user.name} />
      </div>
    )
  }

  popup() {
    const { user, currentUser, itemType, item } = this.props

    const adminActive = user.admin ? ' is-active' : ''
    const normalActive = !user.admin ? ' is-active' : ''

    return (
      <Popup
        closeOnEsc
        closeOnOutsideClick
        popupLink={this.link()}
        getPosition={this.getCardPosition}
      >
        <div className="userCard">
          {this.state.viewingPermissions ? (
            <div>
              <div className="userCard_permissions">
                <i
                  className="userCard_go-back clickable-icon i-arrow-left"
                  onClick={this.toggleView}
                />
                <div className="userCard_permissions-title">Change permissions</div>
              </div>

              <div className="userCard_actions">
                <div className={'userCard_action'+adminActive} onClick={this.setToAdmin}>
                  <div className="userCard_actionTitle">
                    Admin{adminActive ? ' (Current)' : ''}
                  </div>
                  <div className="userCard_actionText">
                    Can view and edit cards, remove members, and change settings.
                  </div>
                </div>

                <div className={'userCard_action'+normalActive} onClick={this.setToNormal}>
                  <div className="userCard_actionTitle">
                    Normal{normalActive ? ' (Current)' : ''}
                  </div>
                  <div className="userCard_actionText">Can only view and edit cards.</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="userCard_user">
                <Avatar avatarURL={user.avatar.url} name={user.name} />
                <h5 className="userCard_title">{user.name}</h5>
                <br/>
                {user.bio || true ?
                  <div className="userCard_bio">{_.truncate(user.bio, {length: 25})}</div>
                : null}
              </div>

              <div className="userCard_actions">
                {itemType === 'task' || this.isCurrentUser() || isAdmin(currentUser, item) ?
                  <div className="userCard_action" onClick={this.removeFromItem}>
                    <div className="userCard_actionTitle">
                      {this.isCurrentUser() ? 'Leave this' : 'Remove from'} {itemType}
                    </div>
                  </div>
                : null}
                {itemType !== 'task' && isAdmin(currentUser, item) ?
                  <div className="userCard_action" onClick={this.toggleView}>
                    <div className="userCard_actionTitle">
                      Change permissions {user.admin ? '(admin)' : '(normal)'}
                    </div>
                  </div>
                : null}
              </div>
            </div>
          )}
        </div>
      </Popup>
    )
  }

  render() {
    return this.state.initialized ? this.popup() : this.link()
  }
}

ItemUser.propTypes = propTypes

ItemUser = connect(null, mapDispatchToProps)(ItemUser)

ItemUser = withRouter(ItemUser)

export default ItemUser

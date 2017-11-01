import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { calcFixedPosition } from 'utils/utils'
import { $updateBoard, $updateTask } from 'state/pages/board/actions'
import Popup from 'components/helpers/popup'
import Avatar from 'components/shared/avatar'

const mapDispatchToProps = { $updateBoard, $updateTask }

const propTypes = {
  $updateBoard: PropTypes.func.isRequired,
  $updateTask: PropTypes.func.isRequired,
  itemType: PropTypes.string.isRequired,
  itemID: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
}

class AddMember extends Component {

  add = add_user => {
    const { itemType, itemID } = this.props
    const action = this.props['$update'+_.upperFirst(itemType)]
    action(itemID, { add_user, admin: false })
  }

  getMemberPopupPosition = () => (
    calcFixedPosition(this.$link, { width: 280, height: 230 })
  )

  link() {
    return (
      <div className="addMember_popover-link" ref={el => this.$link = el}>
        <i className="i-user-add" />
      </div>
    )
  }

  render() {
    let { itemType, users } = this.props
    return (
      <Popup
        closeOnEsc
        closeOnOutsideClick
        popupLink={this.link()}
        getPosition={this.getMemberPopupPosition}
      >
        <div className="addMember">
          <div className="addMember_title">
            <i className="i-user-add" />
            You can only add users who have access to this
            {itemType === 'task' ? ' board' : ' project'}.
          </div>

          <div className="addMember_inner">
            {users.length ? (
              _.map(users, user =>
                <div
                  key={user._id}
                  className="addMember_user"
                  onClick={() => this.add(user._id)}
                >
                  <Avatar avatarURL={user.avatar.url} name={user.name} />
                  <div className="addMember_user-name">
                    {_.truncate(user.name, { length: 28 })}
                  </div>
                </div>
              )
            ) : (
              <div className="addMember_no-results">Everyone is added.</div>
            )}
          </div>
        </div>
      </Popup>
    )
  }
}

AddMember.propTypes = propTypes

AddMember = connect(null, mapDispatchToProps)(AddMember)

export default AddMember

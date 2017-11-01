import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import $ from 'vendor/sortable'
import { isAdmin } from 'utils/utils'
import { $updateBoard, filterTasksByUser } from 'state/pages/board/actions'
import Avatar from 'components/shared/avatar'
import ItemUser from 'components/shared/itemUser'
import AddMember from 'components/shared/addMember'
import ArchieveItem from 'components/shared/archieveItem'
import ArchievedLink from 'components/shared/archievedLink'
import BoardMenuLabels from './labels/labels'

const mapDispatchToProps = { $updateBoard, filterTasksByUser }

const propTypes = {
  $updateBoard: PropTypes.func.isRequired,
  filterTasksByUser: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  board: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
}

class BoardMenu extends Component {

  componentDidMount() {
    this.initDraggables()
  }

  componentDidUpdate() {
    this.initDraggables()
  }

  initDraggables() {
    $('.boardMenu').find('.itemUser_draggable, .label_draggable').draggable({
      appendTo: 'body',
      distance: 7,
      helper: 'clone',
      zIndex: 9999
    })
  }

  toggleUserFilter = userID => {
    this.props.filterTasksByUser(userID)
  }

  getBackgrounds() {
    return [
      '#C62828', '#AD1457', '#9124a3', '#1565C0',
      '#00796B', '#795548', '#455A64', '#424242'
    ]
  }

  changeBoardBackground = background => {
    this.props.$updateBoard(this.props.board._id, { background })
  }

  render() {
    if (!this.props.isActive) return null

    let {
      board,
      users,
      currentUser,
      project,
      onToggleClick,
      filters,
      query,
    } = this.props

    const boardUsers = _.map(board.users, user => (
      _.assign({}, user, _.find(users, { _id: user._id }))
    ))

    const projectUsers = _.map(project.users, user => (
      _.assign({}, user, _.find(users, { _id: user._id }))
    ))

    const addUsers = _.reject(projectUsers, user => (
      _.find(board.users, { _id: user._id })
    ))

    const filterUsers = _.map(boardUsers, user => (
      _.assign({}, user, { active: _.includes(filters.users, user._id)})
    ))

    const currentUserIsAdmin = isAdmin(currentUser, board)

    return (
      <div className="boardMenu">
        <div className="boardMenu_inner">

          <div className="boardMenu_header">
            <div className="boardMenu_header_inner">
              Menu
              <i className="boardMenu_close i-close clickable-icon"
                onClick={onToggleClick}>
              </i>
            </div>
          </div>

          <div className="boardMenu_scroll">

            <div className="boardMenu_members">
              <h5 className="boardMenu_section-title">Members</h5>

              {_.map(boardUsers, user =>
                <span className="itemUser_draggable" data-id={user._id} key={user._id}>
                  <ItemUser
                    user={user}
                    currentUser={currentUser}
                    itemType="board"
                    item={board}
                  />
                </span>
              )}
              {currentUserIsAdmin ?
                <AddMember itemType="board" itemID={board._id} users={addUsers} />
              : null}
            </div>

            <div className="boardMenu_filters">

              <h5 className="boardMenu_section-title">Filter tasks by member</h5>

              {_.map(filterUsers, user =>
                <div
                  key={user._id}
                  onClick={() => this.toggleUserFilter(user._id)}
                  className={'boardMenu_filter-user'+(user.active ? ' is-active' : '')}
                >
                  <span className="itemUser_draggable" data-id={user._id}>
                    <Avatar avatarURL={user.avatar.url} name={user.name} />
                  </span>
                  <div className="boardMenu_filter-user-name">{user.name}</div>
                </div>
              )}
            </div>

            <BoardMenuLabels board={board} filters={filters} currentUserIsAdmin={currentUserIsAdmin} />

            {currentUserIsAdmin ?
              <div className="boardMenu_backgrounds">
                <h5 className="boardMenu_section-title">Change board background</h5>

                {_.map(this.getBackgrounds(), (background) =>
                  <div
                    key={background}
                    className="boardMenu_background_link"
                    style={{ background }}
                    onClick={() => this.changeBoardBackground(background)}
                  />
                )}
              </div>
            : null}

            <div className="boardMenu_see-archieved">
              <ArchievedLink
                page="board"
                id={board._id}
                itemType="lists"
                archieved={query.archieved_lists}
              />
              <br/>
              <ArchievedLink
                page="board"
                id={board._id}
                itemType="tasks"
                archieved={query.archieved_tasks}
              />
            </div>

            {currentUserIsAdmin && <ArchieveItem item={board} itemType="board" />}
          </div>
        </div>
      </div>
    )
  }
}

BoardMenu.propTypes = propTypes

BoardMenu = connect(null, mapDispatchToProps)(BoardMenu)

export default BoardMenu

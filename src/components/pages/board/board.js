import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { isAdmin } from 'utils/utils'
import Avatar from 'components/shared/avatar'
import EditableProp from 'components/shared/editableProp'
import BoardMenu from './boardMenu/boardMenu'

const propTypes = {
  board: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
}

class Board extends PureComponent {

  state = { menuIsActive: true }

  toggleMenu = () => {
    this.setState({ menuIsActive: !this.state.menuIsActive })
  }

  render() {
    let {
      board,
      users,
      currentUser,
      project,
      filters,
      query,
    } = this.props

    return(
      <div className="board">

        {board.archieved && <div className="archieved-bar">This board is archieved</div>}

        <div className="board_heading">
          <Link to={'/projects/'+project._id} className="board_project-avatar">
            <Avatar avatarURL={project.avatar} name={project.title} />
          </Link>

          {isAdmin(currentUser, board) ? (
            <EditableProp item={board} itemType="board" propType="title" />
          ) : (
            <div className="board_title">{board.title}</div>
          )}

          <Link className="board_project-link" to={'/projects/'+project._id}>
            {project.title}
          </Link>

          <div className="board_menu-link" onClick={this.toggleMenu}>
            Show Menu <i className="i-settings"></i>
          </div>

          <BoardMenu
            onToggleClick={this.toggleMenu}
            isActive={this.state.menuIsActive}
            board={board}
            users={users}
            currentUser={currentUser}
            project={project}
            filters={filters}
            query={query}
          />
        </div>
      </div>
    )
  }
}

Board.propTypes = propTypes

export default Board

import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { sortByAlphabet } from 'utils/collection'
import CreateItem from './createItem'

const propTypes = {
  boards: PropTypes.array.isRequired,
  project_id: PropTypes.string,
}

class Boards extends PureComponent {
  render() {
    const { boards, project_id, history } = this.props

    return (
      <div className="boards">
        {_.map(sortByAlphabet(boards, 'title'), board =>

          <div className="boards_item-cont" key={board._id}>
            <Link
              className="boards_item"
              to={"/boards/"+board._id}
              style={{ background: board.background }}
            >
              <h5 className="boards_title">{board.title}</h5>
            </Link>
          </div>
        )}

        <span className="createBoard">
          <CreateItem
            type="board"
            ownerID={{ project_id }}
            onCreate={board => history.push("/boards/"+board._id)}
          />
        </span>
      </div>
    )
  }
}

Boards.propTypes = propTypes

Boards = withRouter(Boards)

export default Boards

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as dragScroll from 'utils/dragScroll'
import CreateItem from 'components/shared/createItem'
import Lists from './lists'

const propTypes = {
  board: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class ListsCont extends Component {

  componentDidMount() {
    dragScroll.init([this.$inner], 'listsCont_inner list')
  }

  componentWillUnmount() {
    dragScroll.destroy([this.$inner])
  }

  onListCreate = () => {
    this.$inner.scrollLeft = this.$inner.scrollWidth
  }

  newListPosition = () => {
    const lists = this.$inner.querySelectorAll('.list')
    const lastList = lists[lists.length-1]
    const position = lastList ? +lastList.getAttribute('data-position') + 1 : 0
    return { position }
  }

  render() {
    return(
      <div className="listsCont">
        <div className="listsCont_inner" ref={el => this.$inner = el}>
          <Lists {...this.props} />
          <CreateItem
            className="listsCont_createItem"
            type="list"
            ownerID={{ board_id: this.props.board._id }}
            onCreate={this.onListCreate}
            apiProps={this.newListPosition}
          />
        </div>
      </div>
    )
  }
}

ListsCont.propTypes = propTypes

export default ListsCont

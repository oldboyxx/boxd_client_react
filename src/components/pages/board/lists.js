import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import $ from 'vendor/sortable'
import { getNewPosition, domScroller } from 'utils/sortable'
import { $moveList, $updateTask } from 'state/pages/board/actions'
import List from './list'

const mapDispatchToProps = { $moveList, $updateTask }

const propTypes = {
  $moveList: PropTypes.func.isRequired,
  $updateTask: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class Lists extends Component {

  componentDidUpdate() {
    this.initDroppableTasks()
  }

  componentDidMount() {
    this.initDroppableTasks()

    this.$listsContInner = $('.listsCont_inner')[0]
    $(this.$lists).sortable({
      distance: 7,
      items: '.list:not(.is-placeholder)',
      placeholder: 'list is-placeholder',
      handle: '.list_header',
      scroll: false,
      helper: 'clone',
      appendTo: 'body',
      start: this.onSortStart,
      stop: this.onSortEnd,
      sort: _.throttle(this.onDrag, 40)
    })
  }

  onSortStart(e, ui) {
    ui.helper.addClass('is-dragging')
    ui.placeholder.height(ui.helper.find('.list_inner').height())
  }

  onSortEnd = (e, ui) => {
    domScroller.stop('lc')

    const listID = ui.item.attr('data-id')
    const position = getNewPosition('list', ui.item)

    $(this.$lists).sortable('cancel') // prevent any dom manipulation
    this.props.$moveList(listID, { position })
  }

  onDrag = e => {
    domScroller.scrollListsIfNeeded(this.$listsContInner, e)
  }

  initDroppableTasks() {
    $(this.$lists).find('.taskItem').droppable({
      accept: '.itemUser_draggable, .label_draggable',
      hoverClass: 'drop-hover',

      drop: (e, ui) => {
        const taskID = $(e.target).data('id')
        const isUser = $(ui.draggable).hasClass('itemUser_draggable')
        const prop = isUser ? 'add_user' : 'add_label'
        const send = { [prop]: $(ui.draggable).data('id') }
        this.props.$updateTask(taskID, send)
      }
    })
  }

  render() {
    let {
      board,
      lists,
      tasks,
      users,
      currentUser,
    } = this.props

    return (
      <div className="lists" ref={el => this.$lists = el}>
        {_.map(lists, list =>
          <List
            key={list._id}
            board={board}
            list={list}
            users={users}
            currentUser={currentUser}
            tasks={_.filter(tasks, { 'list_id': list._id })}
          />
        )}
      </div>
    )
  }
}

Lists.propTypes = propTypes

Lists = connect(null, mapDispatchToProps)(Lists)

export default Lists

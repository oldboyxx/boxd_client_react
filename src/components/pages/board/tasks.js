import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import $ from 'vendor/sortable'
import { getNewPosition, domScroller } from 'utils/sortable'
import { $moveTask } from 'state/pages/board/actions'
import TaskItem from './taskItem'

let $currentHoveredTasks // is shared across instances

const mapDispatchToProps = { $moveTask }

const propTypes = {
  $moveTask: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class Tasks extends Component {

  componentDidMount() {
    this.$listsContInner = $('.listsCont_inner')[0]

    $(this.$tasks).sortable({
      connectWith: '.tasks',
      distance: 7,
      items: '.taskItem:not(.is-placeholder)',
      placeholder: 'taskItem is-placeholder',
      scroll: false,
      helper: 'clone',
      appendTo: 'body',
      start: this.onSortStart,
      stop: this.onSortEnd,
      over: this.onTasksHover,
      sort: _.throttle(this.onDrag, 40)
    })
  }

  onSortStart(e, ui) {
    ui.helper.addClass('is-dragging')
    ui.placeholder.height(ui.helper.height())
  }

  onSortEnd = (e, ui) => {
    domScroller.stop('tk')
    domScroller.stop('lc')

    const taskID = ui.item.attr('data-id')
    const position = getNewPosition('taskItem', ui.item)
    const listID = ui.item.parents('.list').attr('data-id')

    $(this.$tasks).sortable('cancel') // prevent any dom manipulation
    this.props.$moveTask(taskID, { position, list_id: listID })
  }

  onTasksHover(e) {
    $currentHoveredTasks = $(e.target)[0] // can be dom of different instance
  }

  onDrag = e => {
    domScroller.scrollTasksIfNeeded($currentHoveredTasks, e)
    domScroller.scrollListsIfNeeded(this.$listsContInner, e)
  }

  render() {
    const { board, tasks, users, currentUser } = this.props

    return (
      <div className="tasks" ref={el => this.$tasks = el}>
        {_.map(tasks, task =>
          <TaskItem
            key={task._id}
            board={board}
            task={task}
            users={users}
            currentUser={currentUser}
          />
        )}
      </div>
    )
  }
}

Tasks.propTypes = propTypes

Tasks = connect(null, mapDispatchToProps)(Tasks)

export default Tasks

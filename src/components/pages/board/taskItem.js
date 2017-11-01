import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { calcDueDate } from 'utils/utils'
import ItemUser from 'components/shared/itemUser'
import ArchieveItem from 'components/shared/archieveItem'

const propTypes = {
  board: PropTypes.object,
  task: PropTypes.object.isRequired,
  users: PropTypes.array,
  currentUser: PropTypes.object,
  disableActions: PropTypes.bool,
  newTab: PropTypes.bool,
}

class TaskItem extends PureComponent {

  render() {
    const {
      board,
      task,
      users,
      disableActions,
      newTab,
      currentUser,
    } = this.props

    const { dueClass, dueFormat } = calcDueDate(task.due_date)

    const taskUsers = disableActions ? [] : _.map(task.users, _id => (
      _.find(users, { _id })
    ))

    const labels = disableActions ? [] : _.filter(board.labels, label => (
      _.includes(task.labels, label._id)
    ))

    return (
      <div className="taskItem" data-id={task._id} data-position={task.position}>

        <Link
          to={`/boards/${task.board_id}/tasks/${task._id}`}
          target={newTab ? '_blank' : undefined}
          className="taskItem_link"
        />

        {!disableActions && <ArchieveItem item={task} itemType="task" />}

        {labels.length ?
          <div className="taskItem_labels">
            {_.map(labels, label =>
              <div
                key={label._id}
                className="taskItem_label"
                style={{ background: label.color }}
              />
            )}
          </div>
        : null}

        <div className="taskItem_title">{task.title}</div>

        {task.has_desc || task.comments_count || task.due_date ?
          <div className="taskItem_badges">
            {task.has_desc && <i className="i-text taskItem_badge-desc" />}

            {task.comments_count ?
              <div className="taskItem_badge-comments">
                <i className="i-comment"></i> {task.comments_count}
              </div>
            : null}

            {task.due_date ?
              <div className={'taskItem_badge-date'+dueClass}>
                <i className="i-clock"></i> {moment(task.due_date).format(dueFormat)}
              </div>
            : null}
          </div>
        : null}

        {taskUsers.length ?
          <div className="taskItem_users">
            {_.map(taskUsers, user =>
              <ItemUser
                user={user}
                currentUser={currentUser}
                itemType="task"
                item={task}
                key={user._id}
              />
            )}
          </div>
        : null}
      </div>
    )
  }
}

TaskItem.propTypes = propTypes

export default TaskItem

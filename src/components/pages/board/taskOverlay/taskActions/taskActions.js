import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { $updateTask } from 'state/pages/board/actions'
import { calcDueDate, calcFixedPosition } from 'utils/utils'
import ItemUser from 'components/shared/itemUser'
import AddMember from 'components/shared/addMember'
import Popup from 'components/helpers/popup'
import ArchieveItem from 'components/shared/archieveItem'
import AddLabelPopup from './addLabelPopup'

const mapDispatchToProps = { $updateTask }

const propTypes = {
  $updateTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class TaskActions extends Component {

  setDate = date => {
    const { task } = this.props
    const send = { due_date: date ? date.toISOString() : null }
    this.props.$updateTask(task._id, send)
  }

  removeLabel = labelID => {
    const send = { remove_label: labelID }
    this.props.$updateTask(this.props.task._id, send)
  }

  getLabelPopupPosition = () => (
    calcFixedPosition(this.$link, { width: 280, height: 230 })
  )

  renderLabelLink() {
    return (
      <div className="task_add-label" ref={el => this.$link = el}>
        <i className="i-plus"></i>
      </div>
    )
  }

  render() {
    const { task, board, users, currentUser } = this.props

    const { dueClass, dueFormat } = calcDueDate(task.due_date, { longFormat: true })

    const taskUsers = _.map(task.users, _id => (
      _.find(users, { _id })
    ))

    const boardUsers = _.map(board.users, user => (
      _.assign({}, user, _.find(users, { _id: user._id }))
    ))

    const addUsers = _.reject(boardUsers, user => (
      task.users.indexOf(user._id) > -1
    ))

    const labels = _.filter(board.labels, label => (
      _.includes(task.labels, label._id)
    ))

    return (
      <div className="task_actions">

        <div className="task_members">
          <div className="task_section-title">Members</div>

          {_.map(taskUsers, user =>
            <ItemUser
              user={user}
              currentUser={currentUser}
              itemType="task"
              item={task}
              key={user._id}
            />
          )}

          <AddMember itemType="task" itemID={task._id} users={addUsers} />
        </div>

        <div className={'task_date' + dueClass}>

          <div className="task_section-title">Due date</div>
          <i className="i-calendar" />

          <DatePicker
            selected={task.due_date ? moment(task.due_date) : undefined}
            onChange={this.setDate}
            isClearable={true}
            dateFormat={dueFormat}
            placeholderText="Set due date"
          />
        </div>

        <div className="task_labels">
          <div className="task_section-title">Labels</div>

          {_.map(labels, label =>
            <div
              key={label._id}
              className="task_label"
              style={{ background: label.color }}
            >
              {label.title}
              <i
                className="clickable-icon i-close"
                onClick={() => this.removeLabel(label._id)}
              />
            </div>
          )}

          <Popup
            closeOnEsc
            closeOnOutsideClick
            popupLink={this.renderLabelLink()}
            getPosition={this.getLabelPopupPosition}
          >
            <AddLabelPopup board={board} task={task} />
          </Popup>
        </div>

        <ArchieveItem item={task} itemType="task" />
      </div>
    )
  }
}

TaskActions.propTypes = propTypes

TaskActions = connect(null, mapDispatchToProps)(TaskActions)

export default TaskActions

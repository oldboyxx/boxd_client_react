import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextareaAutoSize from 'react-textarea-autosize'
import { $updateTask } from 'state/pages/board/actions'
import EditableProp from 'components/shared/editableProp'
import Comments from './comments/comments'
import TaskActions from './taskActions/taskActions'

const mapDispatchToProps = { $updateTask }

const propTypes = {
  $updateTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class Task extends Component {

  state = { descFormIsActive: false }

  toggleDescForm = () => {
    this.setState({ descFormIsActive: !this.state.descFormIsActive })
  }

  submitDesc = () => {
    const { task } = this.props
    const send = { desc: this.$descTextarea.value }

    this.props.$updateTask(task._id, send, {
      success: () => {
        this.$descTextarea.value = ''
        this.toggleDescForm()
      }
    })
  }

  renderDescForm() {
    return (
      <div className="task_desc-form cf">

        <TextareaAutoSize
          className="task_desc-textarea"
          minRows={2} autoFocus
          placeholder="Add description"
          defaultValue={this.props.task.desc}
          inputRef={el => this.$descTextarea = el}
        />
        <div className="task_desc-submit button" onClick={this.submitDesc}>Save</div>

        <i className="task_desc-close clickable-icon i-close" onClick={this.toggleDescForm} />

        <a href="https://sindresorhus.com/github-markdown-css/" target="_blank">
          <div className="task_desc-formatting-link button">Formatting help</div>
        </a>
      </div>
    )
  }

  renderDesc() {
    const { task } = this.props
    return (
      <div className="task_desc">

        <div className="task_desc-link" onClick={this.toggleDescForm}>
          <i className="i-text" />
          {task.desc ? 'Edit' : 'Add'} description
        </div>

        {task.desc_parsed ?
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: task.desc_parsed }}
          />
        : null}
      </div>
    )
  }

  render() {
    const { task, board, users, currentUser } = this.props

    if (_.isEmpty(task)) return null

    return (
      <div className="task">

        {task.archieved && <div className="archieved-bar">This task is archieved</div>}

        <div className="task_inner">
          <i className="i-close clickable-icon task_close"></i>

          <EditableProp
            item={task}
            itemType="task"
            propType="title"
            hasTextarea
          />
          <TaskActions
            task={task}
            board={board}
            users={users}
            currentUser={currentUser}
          />

          {this.state.descFormIsActive ? this.renderDescForm() : this.renderDesc()}

          <Comments
            taskID={task._id}
            comments={task.comments}
            users={users}
            currentUser={currentUser}
          />
        </div>
      </div>
    )
  }
}

Task.propTypes = propTypes

Task = connect(null, mapDispatchToProps)(Task)

export default Task

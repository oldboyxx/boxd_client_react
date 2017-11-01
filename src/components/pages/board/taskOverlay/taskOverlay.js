import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { $getTaskPage, resetTask } from 'state/pages/board/actions'
import Task from './task'

const mapDispatchToProps = { $getTaskPage, resetTask }

const mapStateToProps = ({ currentUser, boardPage }) => ({
  ..._.pick(boardPage, ['task', 'board', 'users']),
  currentUser: currentUser
})

const propTypes = {
  $getTaskPage: PropTypes.func.isRequired,
  resetTask: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  $getTaskPage: PropTypes.func.isRequired,
  resetTask: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
}

class TaskOverlay extends Component {

  componentDidMount() {
    const { task_id } = this.props.match.params
    const query = queryString.parse(this.props.location.search)
    this.props.$getTaskPage(task_id, query)
  }

  componentWillUnmount() {
    this.props.resetTask()
  }

  goBack = e => {
    if (!/taskOverlay|task_close/.test(e.target.className)) return
    this.props.history.push('/boards/'+this.props.task.board_id)
  }

  render() {
    if (_.isEmpty(this.props.task)) return null

    return (
      <div className="taskOverlay" onClick={this.goBack}>
        <Task {...this.props} />
      </div>
    )
  }
}

TaskOverlay.propTypes = propTypes

TaskOverlay = withRouter(TaskOverlay)

TaskOverlay = connect(mapStateToProps, mapDispatchToProps)(TaskOverlay)

export default TaskOverlay

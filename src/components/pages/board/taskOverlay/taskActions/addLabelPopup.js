import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { $updateTask } from 'state/pages/board/actions'

const mapDispatchToProps = { $updateTask }

const propTypes = {
  $updateTask: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
}

class AddLabelPopup extends Component {

  addLabel = labelID => {
    this.props.$updateTask(this.props.task._id, { add_label: labelID })
  }

  render() {
    const { board, task } = this.props

    const labels = _.filter(board.labels, label => (
      !_.includes(task.labels, label._id)
    ))

    return (
      <div className="addLabelPopup">

        {_.map(labels, label =>
          <div
            key={label._id}
            className="task_label"
            style={{ background: label.color }}
            onClick={() => this.addLabel(label._id)}
          >
            {label.title}
          </div>
        )}

        {!labels.length ?
          <div className="addLabelPopup_no-results">
            All labels are added to this task.
          </div>
        : null}
      </div>
    )
  }
}

AddLabelPopup.propTypes = propTypes

AddLabelPopup = connect(null, mapDispatchToProps)(AddLabelPopup)

export default AddLabelPopup

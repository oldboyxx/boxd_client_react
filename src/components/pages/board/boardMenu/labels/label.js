import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { filterTasksByLabel, $updateBoard } from 'state/pages/board/actions'

const mapDispatchToProps = { filterTasksByLabel, $updateBoard }

const propTypes = {
  filterTasksByLabel: PropTypes.func.isRequired,
  $updateBoard: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
  label: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserIsAdmin: PropTypes.bool.isRequired,
}

class BoardMenuLabel extends Component {

  state = { isEditing: false }

  toggleLabelFilter = () => {
    this.props.filterTasksByLabel(this.props.label._id)
  }

  toggleEditing = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  updateOnKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.preventDefault()
      this.updateLabel()
    }
  }

  updateLabel = () => {
    const { board, label } = this.props
    const update_label = { _id: label._id, title: this.$input.value }

    this.props.$updateBoard(board._id, { update_label }, {
      success: this.toggleEditing
    })
  }

  renderEdit = () => {
    if (this.state.isEditing) {
      return <div className="button" onClick={this.updateLabel}>Ok</div>
    } else {
      return <i className="i-edit clickable-icon" onClick={this.toggleEditing}></i>
    }
  }

  render() {
    const { label, filters, currentUserIsAdmin } = this.props
    const isActive = _.includes(filters.labels, label._id)
    const activeClass = isActive ? 'is-active' : ''

    return (
      <div className="boardMenu_label-cont">
        <div
          data-id={label._id}
          className="boardMenu_label label_draggable"
          style={{ background: label.color }}
        >
          {this.state.isEditing ? (
            <input
              type="text"
              className="text-input"
              defaultValue={label.title}
              ref={el => this.$input = el}
              onKeyDown={this.updateOnKeyDown}
              autoFocus
            />
          ) : (
            <div
              className={`boardMenu_label-title ${activeClass}`}
              onClick={this.toggleLabelFilter}
            >
              {isActive && <i className="i-check" />}
              {label.title}
            </div>
          )}
        </div>
        {currentUserIsAdmin && this.renderEdit()}
      </div>
    )
  }
}

BoardMenuLabel.propTypes = propTypes

BoardMenuLabel = connect(null, mapDispatchToProps)(BoardMenuLabel)

export default BoardMenuLabel

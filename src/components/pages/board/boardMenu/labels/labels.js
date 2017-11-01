import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Label from './label'

const propTypes = {
  board: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserIsAdmin: PropTypes.bool.isRequired,
}

const BoardMenuLabels = ({ board, filters, currentUserIsAdmin }) => (
  <div className="boardMenu_labels">
    <h5 className="boardMenu_section-title">Filter tasks by label</h5>

    {_.map(board.labels, label =>
      <Label
        key={label._id}
        board={board}
        label={label}
        filters={filters}
        currentUserIsAdmin={currentUserIsAdmin}
      />
    )}
  </div>
)

BoardMenuLabels.propTypes = propTypes

export default BoardMenuLabels

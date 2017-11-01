import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { $getBoardPage } from 'state/pages/board/actions'
import { getFilteredAndSortedTasks, getSortedLists } from 'state/pages/board/selectors'
import Board from './board'
import ListsCont from './listsCont'
import TaskOverlay from './taskOverlay/taskOverlay'
import PageLoader from '../pageLoader'

const mapStateToProps = ({ currentUser, boardPage }) => ({
  ...boardPage,
  currentUser,
  tasks: getFilteredAndSortedTasks(boardPage),
  lists: getSortedLists(boardPage)
})

const propTypes = {
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
}

let BoardPage = props => (
  <div className="boardPage" style={{ background: props.board.background }}>
    <Board
      board={props.board}
      users={props.users}
      currentUser={props.currentUser}
      project={props.project}
      filters={props.filters}
      query={props.query}
    />
    <ListsCont
      lists={props.lists}
      board={props.board}
      tasks={props.tasks}
      users={props.users}
      currentUser={props.currentUser}
    />
    <Route path={props.match.url+'/tasks/:task_id'} component={TaskOverlay} />
  </div>
)

BoardPage.propTypes = propTypes

BoardPage = PageLoader({
  pageName: 'board',
  onMount(dispatch, params, query) {
    dispatch($getBoardPage(params.board_id, query))
  },
  isReady: props => !_.isEmpty(props.board)
})(BoardPage)

BoardPage = connect(mapStateToProps)(BoardPage)

export default BoardPage

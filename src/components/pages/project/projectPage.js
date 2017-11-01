import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { $getProjectPage } from 'state/pages/project/actions'
import PageLoader from '../pageLoader'
import Project from './project'
import Boards from 'components/shared/boards'

const mapStateToProps = ({ currentUser, projectPage }) => {
  const { project, users, boards, query } = projectPage

  const projectUsers = _.map(project.users, user => (
    _.assign({}, user, _.find(users, { _id: user._id }))
  ))

  return { project, projectUsers, boards, currentUser, query }
}

const propTypes = {
  project: PropTypes.object.isRequired,
  projectUsers: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
}

let ProjectPage = props => (
  <div className="projectPage">
    <Project
      project={props.project}
      users={props.projectUsers}
      currentUser={props.currentUser}
      query={props.query}
    />
    <div className="projectPage_boards">
      <Boards
        boards={props.boards}
        project_id={props.project._id}
      />
    </div>
  </div>
)

ProjectPage.propTypes = propTypes

ProjectPage = PageLoader({
  pageName: 'project',
  onMount(dispatch, params, query) {
    dispatch($getProjectPage(params['project_id'], query))
  },
  isReady: props => !_.isEmpty(props.project)
})(ProjectPage)

ProjectPage = connect(mapStateToProps)(ProjectPage)

export default ProjectPage

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { $getProjectsPage } from 'state/pages/projects/actions'
import PageLoader from '../pageLoader'
import Projects from './projects'

const mapStateToProps = ({ projectsPage }) => ({
  ...projectsPage
})

const propTypes = {
  projects: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
}

let ProjectsPage = props => (
  <div className="projectsPage">
    <Projects {...props} />
  </div>
)

ProjectsPage.propTypes = propTypes

ProjectsPage = PageLoader({
  pageName: 'projects',
  onMount(dispatch, params, query) {
    dispatch($getProjectsPage(query))
  },
  isReady: props => props.pageIsReady
})(ProjectsPage)

ProjectsPage = connect(mapStateToProps)(ProjectsPage)

export default ProjectsPage

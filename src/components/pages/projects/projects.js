import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { sortByAlphabet } from 'utils/collection'
import ArchievedLink from 'components/shared/archievedLink'
import Avatar from 'components/shared/avatar'
import Boards from 'components/shared/boards'
import CreateItem from 'components/shared/createItem'

const propTypes = {
  projects: PropTypes.array.isRequired,
  boards: PropTypes.array.isRequired,
  query: PropTypes.object.isRequired,
}

class Projects extends PureComponent {
  render() {
    const { projects, boards, query, history } = this.props

    return (
      <div className="projects">

        <div className="projects_controls">
          <CreateItem
            type="project"
            onCreate={project => history.push("/projects/"+project._id)}
          />
          <ArchievedLink
            page="projects"
            itemType="projects"
            archieved={query.archieved_projects}
          />
        </div>

        {_.map(sortByAlphabet(projects, 'title'), project =>
          <div className="projects_item" key={project._id}>

            <div className="projects_head">
              <Link to={'/projects/'+project._id}>
                <Avatar name={project.title} avatarURL={project.avatar} />
                <h4 className="projects_title">{project.title}</h4>
              </Link>
            </div>

            <Boards
              boards={_.filter(boards, { 'project_id': project._id })}
              project_id={project._id}
            />
          </div>
        )}

        {!projects.length ?
          <div className="projects_no-results">
            Go ahead and create your first project!
          </div>
        : null}
      </div>
    )
  }
}

Projects.propTypes = propTypes

Projects = withRouter(Projects)

export default Projects

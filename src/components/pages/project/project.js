import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProjectInfo from './projectInfo'
import AddProjectMember from './addProjectMember'
import Avatar from 'components/shared/avatar'
import ItemUser from 'components/shared/itemUser'
import ArchievedLink from 'components/shared/archievedLink'

const propTypes = {
  project: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
}

const Project = ({ project, users, currentUser, query }) => (
  <div className="project">

    {project.archieved && <div className="archieved-bar">This project is archieved</div>}

    <div className="project_inner">

      <Avatar name={project.title} avatarURL={project.avatar} />
      <ProjectInfo project={project} currentUser={currentUser} />
      <AddProjectMember project={project} currentUser={currentUser} />

      <div className="project_users">
        {_.map(users, user =>
          <ItemUser
            user={user}
            currentUser={currentUser}
            itemType="project"
            item={project}
            key={user._id}
          />
        )}
      </div>

      <ArchievedLink
        page="project"
        id={project._id}
        itemType="boards"
        archieved={query.archieved_boards}
      />
    </div>
  </div>
)

Project.propTypes = propTypes

export default Project

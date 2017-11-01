import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isAdmin } from 'utils/utils'
import { $updateProject } from 'state/pages/project/actions'
import ArchieveItem from 'components/shared/archieveItem'

const mapDispatchToProps = { $updateProject }

const propTypes = {
  $updateProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class ProjectInfo extends Component {

  state = { formIsActive: false }

  toggleForm = () => {
    this.setState({ formIsActive: !this.state.formIsActive })
  }

  submit = () => {
    const { project } = this.props
    const send = {
      title: this.formTitle.value,
      desc: this.formDesc.value
    }
    this.props.$updateProject(project._id, send, {
      success: this.toggleForm
    })
  }

  renderInfo() {
    const { project, currentUser } = this.props

    return (
      <div className="project_info">
        <h3 className="project_title">{project.title}</h3>
        {project.desc && <div className="project_desc"><p>{project.desc}</p></div>}

        {isAdmin(currentUser, project) ?
          <div className="project_openForm button" onClick={this.toggleForm}>
            <i className="i-edit" />
            Edit project
          </div>
        : null}
      </div>
    )
  }

  renderForm() {
    const { project } = this.props

    return (
      <div className="project_form">

        <input
          className="project_input text-input"
          type="text"
          defaultValue={project.title}
          placeholder="Project title"
          ref={el => {this.formTitle = el}}
        />
        <textarea
          className="project_textarea"
          defaultValue={project.desc}
          placeholder="Project description"
          ref={el => {this.formDesc = el}}
        />

        <div className="project_form-submit button" onClick={this.submit}>Save</div>
        <i className="project_close-form clickable-icon i-close" onClick={this.toggleForm} />

        <ArchieveItem item={project} itemType="project" />
      </div>
    )
  }

  render() {
    return <div>{this.state.formIsActive ? this.renderForm() : this.renderInfo()}</div>
  }
}

ProjectInfo.propTypes = propTypes

ProjectInfo = connect(null, mapDispatchToProps)(ProjectInfo)

export default ProjectInfo

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import pubsub from 'sweet-pubsub'
import { isAdmin } from 'utils/utils'
import { $updateProject } from 'state/pages/project/actions'

const mapDispatchToProps = { $updateProject }

const propTypes = {
  $updateProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class AddProjectMember extends Component {

  state = { formIsActive: false }

  toggleForm = () => {
    this.setState({ formIsActive: !this.state.formIsActive })
  }

  onKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.submit()
    }
  }

  submit = () => {
    const { project } = this.props

    if (!/.+@.+/.test(this.$input.value)) {
      return pubsub.emit('toast', 'error', 'Please enter a valid email.')
    }

    this.props.$updateProject(project._id, {
      add_user_email: this.$input.value
    }, {
      success: ({ added_user }) => {
        if (_.isEmpty(added_user)) return
        this.$input.value = ''
        pubsub.emit( 'toast', 'success', `${added_user.name} added to ${project.title}.`)
      }
    })
  }

  renderForm() {
    return (
      <div className="project_add-members-form">
        <div className="project_add-members-explanation">
          Make sure that members you're inviting have an account.
        </div>
        <div className="icon-input">
          <i className="i-user-add"></i>
          <input
            className="project_add-members-input text-input"
            type="text"
            placeholder="Find users by email"
            ref={el => this.$input = el}
            onKeyDown={this.onKeyDown}
          />
        </div>
        <div className="project_add-members-submit button" onClick={this.submit}>
          Add
        </div>
        <i className="clickable-icon i-close project_add-members-close" onClick={this.toggleForm} />
      </div>
    )
  }

  renderLink() {
    return (
      <div className="project_add-members-link button" onClick={this.toggleForm}>
        <i className="i-user-add" />
        Add members
      </div>
    )
  }

  render() {
    if (!isAdmin(this.props.currentUser, this.props.project)) return null
    return this.state.formIsActive ? this.renderForm() : this.renderLink()
  }
}

AddProjectMember.propTypes = propTypes

AddProjectMember = connect(null, mapDispatchToProps)(AddProjectMember)

export default AddProjectMember

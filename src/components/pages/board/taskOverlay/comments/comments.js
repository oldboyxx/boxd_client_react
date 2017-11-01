import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/shared/avatar'
import CommentForm from './commentForm'
import Comment from './comment'

const propTypes = {
  taskID: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class Comments extends PureComponent {

  state = { formIsActive: false }

  toggleForm = () => {
    this.setState({ formIsActive: !this.state.formIsActive })
  }

  render() {
    const { taskID, comments, users, currentUser } = this.props

    return (
      <div className="comments">

        <div className="comments_title">
          <i className="i-comment" />
          Comments
        </div>

        <div className="comments_add">
          <Avatar avatarURL={currentUser.avatar.url} name={currentUser.name} />

          {this.state.formIsActive ? (
            <CommentForm
              taskID={taskID}
              action="create"
              onClose={this.toggleForm}
              onSuccess={this.toggleForm}
            />
          ) : (
            <div className="comments_add-link">
              <textarea placeholder="Add a comment" onClick={this.toggleForm} />
            </div>
          )}
        </div>

        <div className="comments_items">
          {_.map(comments, comment =>
            <Comment
              taskID={taskID}
              comment={comment}
              users={users}
              currentUser={currentUser}
              key={comment._id}
            />
          )}
        </div>
      </div>
    )
  }
}

Comments.propTypes = propTypes

export default Comments

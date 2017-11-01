import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { $deleteComment } from 'state/pages/board/actions'
import Avatar from 'components/shared/avatar'
import CommentForm from './commentForm'

const mapDispatchToProps = { $deleteComment }

const propTypes = {
  $deleteComment: PropTypes.func.isRequired,
  taskID: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class Comment extends Component {

  state = { formIsActive: false }

  toggleForm = () => {
    this.setState({ formIsActive: !this.state.formIsActive })
  }

  deleteComment = () => {
    const id = this.props.comment._id
    const task_id = this.props.taskID
    this.props.$deleteComment(id, { task_id })
  }

  render() {
    const { taskID, comment, users, currentUser } = this.props
    const user = _.find(users, { _id: comment.user })
    const isCurrentUser = user._id === currentUser._id

    return (
      <div className="comment">
        <Avatar avatarURL={user.avatar.url} name={user.name} />

        {this.state.formIsActive ? (
          <CommentForm
            taskID={taskID}
            action="update"
            comment={comment}
            onSuccess={this.toggleForm}
            onClose={this.toggleForm}
          />
        ) : (
          <div className="comment_inner cf">
            <div className="comment_username">{user.name}</div>
            <div className="comment_created-at">{moment(comment.created_at).fromNow()}</div>
            <div className="comment_content">{comment.content}</div>

            {isCurrentUser ?
              <div className="comment_actions">
                <div className="comment_edit" onClick={this.toggleForm}>Edit</div>
                <div className="comment_actions-spacer"></div>
                <div className="comment_delete" onClick={this.deleteComment}>Delete</div>
              </div>
            : null}
          </div>
        )}
      </div>
    )
  }
}

Comment.propTypes = propTypes

Comment = connect(null, mapDispatchToProps)(Comment)

export default Comment

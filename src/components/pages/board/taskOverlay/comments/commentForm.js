import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { $createComment, $updateComment } from 'state/pages/board/actions'
import TextareaAutoSize from 'react-textarea-autosize'

const mapDispatchToProps = { $createComment, $updateComment }

const propTypes = {
  $createComment: PropTypes.func.isRequired,
  $updateComment: PropTypes.func.isRequired,
  taskID: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  comment: PropTypes.object,
  onSuccess: PropTypes.func,
  onClose: PropTypes.func,
}

class CommentForm extends Component {

  apiData() {
    return {
      content: this.$textarea.value,
      task_id: this.props.taskID
    }
  }

  success = () => {
    this.$textarea.value = ''
    if (this.props.onSuccess) this.props.onSuccess()
  }

  create = () => {
    this.props.$createComment(this.apiData(), {
      success: this.success
    })
  }

  update = () => {
    const id = this.props.comment._id
    this.props.$updateComment(id, this.apiData(), {
      success: this.success
    })
  }

  render() {
    const { action, comment } = this.props

    const isUpdate = action === 'update'
    const onSubmit = this[isUpdate ? 'update' : 'create']
    const dftVal = isUpdate ? comment.content : ''

    return (
      <div className="comments_form cf">

        <TextareaAutoSize
          className="comments_form-textarea"
          placeholder="Add a comment"
          defaultValue={dftVal}
          minRows={2}
          inputRef={el => this.$textarea = el}
          autoFocus
        />
        <div className="comments_form-submit button" onClick={onSubmit}>
          {isUpdate ? 'Save' : 'Add'}
        </div>

        <i className="i-close clickable-icon comments_form-close"
           onClick={this.props.onClose}>
        </i>
      </div>
    )
  }
}

CommentForm.propTypes = propTypes

CommentForm = connect(null, mapDispatchToProps)(CommentForm)

export default CommentForm

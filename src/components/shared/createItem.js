import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import actions from 'state/allActions'

const mapDispatchToProps = actions

const propTypes = {
  hasTextarea: PropTypes.bool,
  className: PropTypes.string,
  ownerID: PropTypes.objectOf(PropTypes.string),
  type: PropTypes.string.isRequired,
  onCreate: PropTypes.func,
}

class CreateItem extends Component {

  state = { isActive: false, title: '' }

  toggle = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  onChange = e => {
    this.setState({ title: e.target.value })
  }

  onKeyDown = e => {
    if (e.keyCode === 27) {
      this.toggle()
    }
    if (e.keyCode === 13) {
      e.preventDefault()
      this.submit()
    }
  }

  submit = () => {
    let { ownerID, type, onCreate, apiProps } = this.props

    let send = { ...ownerID, title: this.state.title }
    if (apiProps) send = { ...send, ...apiProps() }
    const action = this.props['$create'+_.upperFirst(type)]

    action(send, {
      success: data => {
        this.setState({ title: '' })
        if (onCreate) onCreate(data[type])
      }
    })
  }

  renderForm() {
    const { hasTextarea, type } = this.props

    const props = {
      className: `createItem_${hasTextarea ? 'textarea' : 'input text-input'}`,
      placeholder: _.upperFirst(type)+' title...',
      value: this.state.title,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      autoFocus: true
    }

    return (
      <div className="createItem_form">
        {hasTextarea ? <textarea {...props} /> : <input {...props} type="text" />}
        <div className="createItem_submit button" onClick={this.submit}>Create</div>
        <i className="createItem_close clickable-icon i-close" onClick={this.toggle} />
      </div>
    )
  }

  renderLink() {
    return (
      <div className="createItem_link" onClick={this.toggle}>
        <div className="createItem_title">Create new {this.props.type}</div>
      </div>
    )
  }

  render() {
    let klass = this.props.className
    return (
      <div className={klass ? 'createItem '+klass : 'createItem'}>
        {this.state.isActive ? this.renderForm() : this.renderLink()}
      </div>
    )
  }
}

CreateItem.propTypes = propTypes

CreateItem = connect(null, mapDispatchToProps)(CreateItem)

export default CreateItem

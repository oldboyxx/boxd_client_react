import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextareaAutoSize from 'react-textarea-autosize'
import actions from 'state/allActions'

const mapDispatchToProps = actions

const propTypes = {
  item: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
  propType: PropTypes.string,
  hasTextarea: PropTypes.bool,
}

class EditableProp extends Component {

  state = { isActive: false }

  toggle = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  onKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.preventDefault()
      this.update()
    }
  }

  update = () => {
    const { item, itemType, propType } = this.props
    const action = this.props['$update'+_.upperFirst(itemType)]

    action(item._id, { [propType]: this.input.value }, {
      success: this.toggle
    })
  }

  render() {
    const { item, itemType, propType, hasTextarea } = this.props

    const props = {
      className: itemType + (hasTextarea ? `_textarea-${propType}` : `_input-${propType} text-input`),
      placeholder: _.upperFirst(itemType)+' '+propType,
      defaultValue: item[propType],
      onKeyDown: this.onKeyDown,
      onBlur: this.update,
      [hasTextarea ? 'inputRef' : 'ref']: el => {
        this.input = el
        if (el) el.focus()
      }
    }

    if (this.state.isActive) {
      return hasTextarea ? <TextareaAutoSize {...props} /> : <input {...props} type="text" />
    } else {
      return (
        <div className={itemType+'_'+propType}
          onClick={() => { if (!this.state.isActive) this.toggle() }}>
          {item[propType]}
        </div>
      )
    }
  }
}

EditableProp.propTypes = propTypes

EditableProp = connect(null, mapDispatchToProps)(EditableProp)

export default EditableProp

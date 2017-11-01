import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import actions from 'state/allActions'

const mapDispatchToProps = actions

const propTypes = {
  item: PropTypes.object.isRequired,
  itemType: PropTypes.string.isRequired,
}

class ArchieveItem extends Component {

  archieve = () => {
    const { _id, archieved } = this.props.item
    const { itemType } = this.props

    const actionType = _.includes(['project', 'board'], itemType) ? '$update' : '$archieve'
    const action = this.props[actionType + _.upperFirst(itemType)]

    action(_id, { archieved: !archieved })
  }

  render() {
    let { itemType, item } = this.props

    return (
      <i className={itemType+'_archieve clickable-icon i-archieve'} onClick={this.archieve}>
        <div className="tt-source stretch" />
        <div className={`${itemType}_tt tt ${item.archieved ? 'success' : 'danger'}`}>
          {item.archieved ? 'Unarchive' : 'Archive'} this {itemType}
        </div>
      </i>
    )
  }
}

ArchieveItem.propTypes = propTypes

ArchieveItem = connect(null, mapDispatchToProps)(ArchieveItem)

export default ArchieveItem

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import actions from 'state/allActions'

const mapDispatchToProps = actions

const propTypes = {
  page: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  id: PropTypes.string,
  archieved: PropTypes.bool,
}

class ArchievedLink extends Component {

  onClick = () => {
    const { page, itemType, id, archieved } = this.props

    const query = archieved ? {} : { ['archieved_'+itemType]: true }
    const action = this.props[`$get${_.upperFirst(page)}Page`]
    id ? action(id, query) : action(query)
  }

  render() {
    const { itemType, archieved } = this.props

    return (
      <div className={'see-archieved-'+itemType} onClick={this.onClick}>
        See {archieved ? 'active' : 'archived'} {itemType}
      </div>
    )
  }
}

ArchievedLink.propTypes = propTypes

ArchievedLink = connect(null, mapDispatchToProps)(ArchievedLink)

export default ArchievedLink

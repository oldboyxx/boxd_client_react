import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pubsub from 'sweet-pubsub'
import { CSSTransition } from 'react-transition-group'

const propTypes = {}

class NavSpinner extends Component {

  state = { isVisible: false }
  lastStart = 0

  componentDidMount() {
    pubsub.on('ajaxStarted', 'ajxs', () => {
      this.lastStart = Date.now()
      this.setState({ isVisible: true })
    })
    pubsub.on('ajaxEnded', 'ajxs', () => {
      const ajaxDur = Date.now() - this.lastStart
      const dur = ajaxDur < 150 ? (150 - ajaxDur) : 0
      setTimeout(() => this.setState({ isVisible: false }), dur)
    })
  }

  componentWillUnmount() {
    pubsub.off('ajaxStarted ajaxEnded', 'ajxs')
  }

  render() {
    return (
      <CSSTransition in={this.state.isVisible} classNames="spin" timeout={150}>
        <div className="nav_spinner spinner" />
      </CSSTransition>
    )
  }
}

NavSpinner.propTypes = propTypes

export default NavSpinner

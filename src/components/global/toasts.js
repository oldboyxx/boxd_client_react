import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import pubsub from 'sweet-pubsub'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const propTypes = {}

class Toasts extends PureComponent {

  state = { id: 1, toasts: [] }

  componentDidMount() {
    pubsub.on('toast', this.addToast)
  }

  componentWillUnmount() {
    pubsub.off('toast', this.addToast)
  }

  calcOffset() {
    const els = this.cont.querySelectorAll('.toast')
    return _.reduce(els, (sum, el) => {
      return sum + el.offsetHeight + 10
    }, 15)
  }

  addToast = (type, message, dur=5000) => {
    let { id, toasts } = this.state
    id = id + 1
    const newToast = { id, type, message, offset: this.calcOffset() }
    this.setState({ id, toasts: [...toasts, newToast] })
    setTimeout(this.removeToast(id), dur)
  }

  removeToast = id => () => {
    this.setState({
      toasts: _.reject(this.state.toasts, { id })
    })
  }

  render() {
    return (
      <div ref={el => this.cont = el}>
        <TransitionGroup>
          {_.map(this.state.toasts, t => (
            <CSSTransition key={t.id} classNames="toast" timeout={300}>
              <div
                className={'toast is-'+t.type}
                style={{ bottom: t.offset }}
                onClick={this.removeToast(t.id)}
              >
                {t.message}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    )
  }
}

Toasts.propTypes = propTypes

export default Toasts

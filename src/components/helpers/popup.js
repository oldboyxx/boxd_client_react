import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

const rootEl = document.getElementById('root')

const propTypes = {
  children: PropTypes.element.isRequired,
  popupLink: PropTypes.element.isRequired,
  getPosition: PropTypes.func.isRequired,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
}

class Popup extends PureComponent {

  state = { isOpen: false }

  componentWillUnmount() {
    this.eventListeners('remove')
    if (rootEl.contains(this.$container)) {
      rootEl.removeChild(this.$container)
    }
  }

  openPopup() {
    this.$container = document.createElement('span')
    rootEl.appendChild(this.$container)

    const pos = this.props.getPosition()
    this.$container.style.zIndex = `${9999}`
    this.$container.style.position = 'fixed'
    this.$container.style.top = `${pos.top}px`
    this.$container.style.left = `${pos.left}px`

    this.eventListeners('add')
    this.setState({ isOpen: true })
  }

  closePopup = () => {
    this.eventListeners('remove')
    this.setState({ isOpen: false }, () => {
      rootEl.removeChild(this.$container)
    })
  }

  eventListeners(action) {
    if (this.props.closeOnEsc) {
      document[action+'EventListener']('keydown', this.onKeyDown)
    }
    if (this.props.closeOnOutsideClick) {
      document[action+'EventListener']('mouseup', this.onOutsideMouseClick)
      document[action+'EventListener']('touchstart', this.onOutsideMouseClick)
    }
  }

  onKeyDown = e => {
    if (this.state.isOpen && e.keyCode === 27) {
      this.closePopup()
    }
  }

  onOutsideMouseClick = e => {
    if (
      this.state.isOpen &&
      e.button === 0 &&
      !this.$container.contains(e.target) &&
      !this.$link.contains(e.target)
    ) {
      this.closePopup()
    }
  }

  createPortal = () => (
    ReactDOM.createPortal(
      React.cloneElement(this.props.children),
      this.$container
    )
  )

  render() {
    return (
      <span>
        <span
          ref={el => this.$link = el}
          onClick={() => this.state.isOpen ? this.closePopup() : this.openPopup()}
        >
          {this.props.popupLink}
        </span>
        {this.state.isOpen && this.createPortal()}
      </span>
    )
  }
}

Popup.propTypes = propTypes

export default Popup

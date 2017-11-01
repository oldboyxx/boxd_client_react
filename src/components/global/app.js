import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Toasts from 'components/global/toasts'
import Nav from 'components/global/nav/nav'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const App = ({ children }) => (
  <div>
    <Toasts />
    <Nav />
    {children}
  </div>
)

App.propTypes = propTypes

export default App

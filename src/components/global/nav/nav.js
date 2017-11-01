import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from 'components/shared/avatar'
import NavSearch from './navSearch'
import NavSpinner from './navSpinner'

const mapStateToProps = ({ currentUser }) => ({
  currentUser
})

const propTypes = {
  currentUser: PropTypes.object.isRequired
}

let Nav = ({ currentUser }) => {
  if (_.isEmpty(currentUser)) return null

  return (
    <div className="nav cf">

      <div className="float-left">
        <Link to="/" className="nav_block nav_home button">
          <i className="i-logo"></i>
          Home
        </Link>
        <NavSearch />
      </div>

      <Link to="/" className="nav_block nav_logo">
        <i className="i-logo"></i>
        Boxd
      </Link>

      <div className="float-right">
        <NavSpinner />

        {currentUser.avatar ?
          <Link to="/settings" className="nav_block nav_user button">
            <Avatar avatarURL={currentUser.avatar.url} name={currentUser.name} />
            {_.truncate(currentUser.name, { 'length': 20 })}
          </Link>
        : null}
      </div>
    </div>
  )
}

Nav.propTypes = propTypes

Nav = connect(mapStateToProps)(Nav)

export default Nav

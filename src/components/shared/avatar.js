import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  avatarURL: PropTypes.string,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}

let Avatar = ({ avatarURL, name, style }) => {

  if (avatarURL) {
    return (
      <div className="avatar" style={style}>
        <img className="avatar_img" src={avatarURL} alt={name} />
      </div>
    )
  } else {

    const initials = _.map(name.split(' '), word => (
      word[0].toUpperCase()
    )).slice(0, 2)

    return (
      <div className="avatar has-no-img" style={style}>
        <div className="avatar_initials">{initials}</div>
      </div>
    )
  }
}

Avatar.propTypes = propTypes

export default Avatar

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { pageChange } from 'state/pages/actions'

let initialLoadDone = false

const propTypes = {
  pageName: PropTypes.string.isRequired,
  onMount: PropTypes.func,
  isReady: PropTypes.func,
}

let PageLoader = ({ pageName, onMount, isReady }) => (
  Child => (
    class PageLoaderInner extends Component {

      componentDidMount() {
        const { location, dispatch, match } = this.props

        let query = {
          ...queryString.parse(location.search)
        }

        if (!initialLoadDone) {
          query.get_current_user = true
          initialLoadDone = true
        }

        document.body.className = ''
        this.props.dispatch(pageChange())

        if (onMount) {
          onMount(dispatch, match.params, query)
        }
      }

      render() {
        if (!isReady(this.props)) {
          return <div className="pageSpinner spinner" />
        } else {
          document.body.className = `body_${pageName}Page`
          return <Child {...this.props} />
        }
      }
    }
  )
)

PageLoader.propTypes = propTypes

export default PageLoader

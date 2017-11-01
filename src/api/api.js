import _ from 'lodash'
import superagent from 'superagent'
import pubsub from 'sweet-pubsub'
import config from 'config'

const defaults = {
  baseURL: config.apiURL,
  error: {
    message: "Can't establish connection. Please try again later."
  },
  set() {
    if (config.becomeDevUser) return {}
    return { 'x-jwtoken': localStorage.token }
  },
  query() {
    if (!config.becomeDevUser) return {}
    return { become_dev_user: true }
  }
}

const api = {}

_.each(['get', 'post', 'put', 'delete'], method => {

  api[method] = (url, props, callbacks = {}) => {
    pubsub.emit('ajaxStarted')

    return new Promise((resolve, reject) => {

      let req = superagent[method](defaults.baseURL + url)
        .set(defaults.set())
        .query(defaults.query())

      req[method === 'get' ? 'query' : 'send'](props)

      req.end((e, res) => {
        pubsub.emit('ajaxEnded')

        let errors

        if (_.get(res, 'body.errors')) {
          errors = res.body.errors
        } else if (!_.get(res, 'body.data')) {
          errors = [defaults.error]
        }

        if (errors) {
          if (callbacks.error) callbacks.error(errors)
          return reject(errors)
        } else {
          if (callbacks.success) callbacks.success(res.body.data)
          return resolve(res.body.data)
        }
      })
    })
  }
})

export default api

export const handleError = errors => {

  if (/denied\:jwtoken/.test(errors[0].message)) {
    return pubsub.emit('tokenError')
  }
  _.each(errors, error => {
    pubsub.emit('toast', 'error', error.message)
  })
}

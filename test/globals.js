import _ from 'lodash'
import { expect } from 'chai'
import { jsdom } from 'jsdom'
import { mockRequest } from './mockRequest'
import * as utils from './utils'

/**
* Attach some stuff to global for convenience
*/

global._ = _
global.expect = expect
global.mockRequest = mockRequest

_.assign(global, utils)

// one more global - global.store is assigned in setup.js

/**
* Init fake browser environment
*/

global.document = jsdom('')
global.window = document.defaultView

Object.keys(document.defaultView).forEach(prop => {
  if (typeof global[prop] === 'undefined') {
    global[prop] = document.defaultView[prop]
  }
})

global.navigator = { userAgent: 'node.js' }

/**
* Mock browser storage
*/

const stores = { localStorage: {}, sessionStorage: {} }

_.each(['localStorage', 'sessionStorage'], storeType => {
  (type => {
    global[type] = global.window[type] = {
      getItem: key => stores[type][key],
      setItem: (key, val) => stores[type][key] = val,
      removeItem: key => delete stores[type][key],
      clear: () => stores[type] = {},
    }
  })(storeType)
})
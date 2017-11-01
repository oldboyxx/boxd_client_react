import { createStore } from './utils'

/**
* Init new store before each test
*/

beforeEach(() => {
  createStore()
})

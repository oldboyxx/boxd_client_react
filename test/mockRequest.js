/**
* We can test sync/async action creators and reducers in one fell swoop
* When testing we just mock request, dispatch an action and make assertions
* using real store state. I prefer this simple solution to nock library & mock stores.
*/

let mockMethod = ''
let mockUrl = ''
let mockRet = {}

/**
* This is used by async action creators while testing instead of real request function
* it's required from src/api/request.js
*/

const mockApi = {}
const verbs = ['get', 'post', 'put', 'delete']

verbs.forEach(verb => {
  (method => {
    mockApi[method] = url => {
      expect(mockMethod).to.equal(method)
      expect(mockUrl).to.equal(url)
      return {
        then(callback) {
          callback(mockRet)
        }
      }
    }
  })(verb)
})

export default mockApi
export const mockHandleError = () => {}

/**
* This is used in test suites
* pass method, url and mock response object
*/

export const mockRequest = (method, url, ret) => {
  mockMethod = method
  mockUrl = url
  mockRet = ret
}

import * as actions from 'state/global/currentUser/actions'

describe('currentUser', () => {

  const expectEmail = () => {
    onStoreUpdate(({ currentUser }) => {
      expect(currentUser.email).to.equal('user@email')
    })
  }

  it('should get currentUser if requested directly', () => {
    mockRequest('get', '/settings', {
      user: { email: 'user@email' }
    })
    expectEmail()
    store.dispatch(actions.$getCurrentUser())
  })

  it('should get currentUser if requested in addition to other stuff', () => {
    expectEmail()
    store.dispatch({ type: 'ANY_ACTION', data: { current_user: { email: 'user@email' } } })
  })

  it('should update currentUser', () => {
    mockRequest('put', '/settings', {
      user: { email: 'user@email' }
    })
    expectEmail()
    store.dispatch(actions.$updateCurrentUser())
  })
})

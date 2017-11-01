import * as actions from 'state/global/search/actions'

describe('search', () => {

  it('should get tasks', () => {
    mockRequest('get', '/tasks', {
      tasks: [{ title: 'taskname' }]
    })

    onStoreUpdate(({ search }) => {
      expect(search.tasks).to.be.an('array').and.not.be.empty
      expect(search.tasks[0].title).to.equal('taskname')
    })

    store.dispatch(actions.$search({ search: 'taskname' }))
  })
})

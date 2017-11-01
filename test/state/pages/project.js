import * as actions from 'state/pages/project/actions'

describe('page project', () => {

  const mockState = {
    project: { title: 'project' },
    boards: [{ title: 'board' }],
    users: [{ email: 'a@com' }, { email: 'b@com' }],
    query: { archieved_boards: false }
  }

  const mockRet = _.omit(mockState, ['query'])

  it('should get project page data', () => {
    mockRequest('get', '/projects/id', mockRet)

    onStoreUpdate(({ projectPage }) => {
      expect(projectPage.project.title).to.equal('project')
      expect(projectPage.boards).to.be.an('array').and.not.be.empty
      expect(projectPage.users).to.be.an('array').and.not.be.empty
      expect(projectPage.boards[0].title).to.equal('board')
      expect(projectPage.users[1].email).to.equal('b@com')
      expect(projectPage.query.archieved_boards).to.be.true
    })

    store.dispatch(actions.$getProjectPage('id', { archieved_boards: true }))
  })

  it('should update project', () => {
    createStore({ projectPage: mockState })

    mockRequest('put', '/projects/id', {
      project: { title: 'updated' },
      added_user: { email: 'new@com' }
    })

    onStoreUpdate(({ projectPage }) => {
      expect(projectPage.project.title).to.equal('updated')
      expect(projectPage.users.length).to.equal(3)
      expect(projectPage.users).to.contain({ email: 'new@com' })
    })

    store.dispatch(actions.$updateProject('id', {
      title: 'updated',
      add_user_email: 'new@com'
    }))
  })
})

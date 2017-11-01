import * as actions from 'state/pages/projects/actions'

describe('page projects', () => {

  it('should get projects page data', () => {
    mockRequest('get', '/projects', {
      projects: [{ title: 'project' }],
      boards: [{ title: 'board' }]
    })

    onStoreUpdate(({ projectsPage }) => {
      expect(projectsPage.projects).to.be.an('array').and.not.be.empty
      expect(projectsPage.boards).to.be.an('array').and.not.be.empty
      expect(projectsPage.projects[0].title).to.equal('project')
      expect(projectsPage.boards[0].title).to.equal('board')
      expect(projectsPage.pageIsReady).to.be.true
      expect(projectsPage.query.archieved_projects).to.be.true
    })

    store.dispatch(actions.$getProjectsPage({ archieved_projects: true }))
  })
})

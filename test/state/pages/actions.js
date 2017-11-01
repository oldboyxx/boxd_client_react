import * as actions from 'state/pages/actions'

describe('pages', () => {

  it('should reset page data on page change', () => {
    createStore({ projectsPage: {
      projects: [{ title: 'Project' }]
    }})

    onStoreUpdate(({ projectsPage }) => {
      expect(projectsPage.projects).to.be.an('array').and.be.empty
    })

    store.dispatch(actions.pageChange())
  })
})

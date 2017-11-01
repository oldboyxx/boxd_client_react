import * as actions from 'state/pages/board/actions'

describe('page board', () => {

  const mockState = {
    project: { title: 'project' },
    board: { title: 'board' },
    lists: [
      { _id: '1', title: 'list1', position: 1 },
      { _id: '2', title: 'list2', position: 2 }
    ],
    tasks: [
      { _id: '1', title: 'task1', position: 1 },
      { _id: '2', title: 'task2', position: 2 }
    ],
    users: [
      { _id: '1', email: 'user1@com' },
      { _id: '2', email: 'user2@com' }
    ],

    task: {},

    filters: {
      users: [],
      labels: []
    },
    query: {
      archieved_lists: false,
      archieved_tasks: false
    }
  }

  const mockRet = _.omit(mockState, ['task', 'filters', 'query'])

  const mockTask = { task: {
    _id: '1', title: 'task1', position: 1,
    comments: [{ _id: '5', content: 'text' }]
  }}

  /**
  * Synchronous actions
  */

  it('should filter tasks by user', () => {
    createStore({ boardPage: mockState })

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.filters.users).to.be.an('array').and.not.be.empty
      expect(boardPage.filters.users[0]).to.equal('userid')
    })

    store.dispatch(actions.filterTasksByUser('userid'))

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.filters.users).to.be.an('array').and.be.empty
    })

    store.dispatch(actions.filterTasksByUser('userid'))
  })

  it('should filter tasks by label', () => {
    createStore({ boardPage: mockState })

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.filters.labels).to.be.an('array').and.not.be.empty
      expect(boardPage.filters.labels[0]).to.equal('labelname')
    })

    store.dispatch(actions.filterTasksByLabel('labelname'))

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.filters.labels).to.be.an('array').and.be.empty
    })

    store.dispatch(actions.filterTasksByLabel('labelname'))
  })

  it('should reset task', () => {
    createStore({ boardPage: mockTask })

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.task).to.be.an('object').and.be.empty
    })

    store.dispatch(actions.resetTask())
  })

  /**
  * Board
  */

  it('should get board page data', () => {
    mockRequest('get', '/boards/id', mockRet)

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.project.title).to.equal('project')
      expect(boardPage.board.title).to.equal('board')

      _.each(_.pick(boardPage, ['lists', 'tasks', 'users']), (items) => {
        expect(items).to.be.an('array').and.not.be.empty
        expect(items.length).to.equal(2)
        expect(items[0]._id).to.equal('1')
      })

      expect(boardPage.task).to.be.an('object').and.be.empty
      expect(boardPage.filters.users).to.be.an('array').and.be.empty
      expect(boardPage.filters.labels).to.be.an('array').and.be.empty

      expect(boardPage.query.archieved_lists).to.not.be.ok
      expect(boardPage.query.archieved_tasks).to.be.true
    })

    store.dispatch(actions.$getBoardPage('id', { archieved_tasks: true }))
  })

  it('should update board', () => {
    createStore({ boardPage: mockState })
    mockRequest('put', '/boards/id', {
      board: { title: 'updated' }
    })

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.board.title).to.equal('updated')
    })

    store.dispatch(actions.$updateBoard('id', { title: 'updated' }))
  })

  /**
  * Lists
  */

  it('should create list', () => {
    mockRequest('post', '/lists', {
      list: { title: 'new' }
    })

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.lists).to.contain({ title: 'new' })
    })

    store.dispatch(actions.$createList({ title: 'new' }))
  })

  it('should update list', () => {
    createStore({ boardPage: mockState })
    mockRequest('put', '/lists/1', {
      list: { _id: '1', title: 'updated' }
    })

    onStoreUpdate(({ boardPage }) => {
      const list = _.find(boardPage.lists, { _id: '1' })
      expect(list.title).to.equal('updated')
    })

    store.dispatch(actions.$updateList('1', { title: 'updated' }))
  })

  it('should archieve list', () => {
    createStore({ boardPage: mockState })
    mockRequest('put', '/lists/1', {
      list: { _id: '1', archieved: true }
    })

    onStoreUpdate(({ boardPage }) => {
      const list = _.find(boardPage.lists, { _id: '1' })
      expect(list).to.be.undefined
    })

    store.dispatch(actions.$archieveList('1', { archieved: true }))
  })

  it('should move list', () => {
    createStore({ boardPage: mockState })
    mockRequest('put', '/lists/1', {
      list: { _id: '1', position: 3 }
    })

    onStoreUpdate(({ boardPage }) => {
      const list = _.find(boardPage.lists, { _id: '1' })
      expect(list.position).to.equal(3)
    })

    store.dispatch(actions.$moveList('1', { position: 3 }))
  })

  /**
  * Tasks
  */

  it('should create task', () => {
    mockRequest('post', '/tasks', {
      task: { title: 'new' }
    })

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.tasks).to.contain({ title: 'new' })
    })

    store.dispatch(actions.$createTask({ title: 'new' }))
  })

  it('should update task', () => {
    createStore({ boardPage: mockState })
    mockRequest('put', '/tasks/1', {
      task: { _id: '1', title: 'updated' }
    })

    onStoreUpdate(({ boardPage }) => {
      const task = _.find(boardPage.tasks, { _id: '1' })
      expect(task.title).to.equal('updated')
    })

    store.dispatch(actions.$updateTask('1', { title: 'updated' }))
  })

  it('should archieve task', () => {
    createStore({ boardPage: mockState })
    mockRequest('put', '/tasks/1', {
      task: { _id: '1', archieved: true }
    })

    onStoreUpdate(({ boardPage }) => {
      const task = _.find(boardPage.tasks, { _id: '1' })
      expect(task).to.be.undefined
    })

    store.dispatch(actions.$archieveTask('1', { archieved: true }))
  })

  it('should move task', () => {
    createStore({ boardPage: mockState })
    mockRequest('put', '/tasks/1', {
      task: { _id: '1', list_id: '2', position: 3 }
    })

    onStoreUpdate(({ boardPage }) => {
      const task = _.find(boardPage.tasks, { _id: '1' })
      expect(task.position).to.equal(3)
      expect(task.list_id).to.equal('2')
    })

    store.dispatch(actions.$moveTask('1', { list_id: '2', position: 3 }))
  })

  it('should get task page data', () => {
    mockRequest('get', '/tasks/1', mockTask)

    onStoreUpdate(({ boardPage }) => {
      expect(boardPage.task._id).to.equal('1')
      expect(boardPage.task.position).to.equal(1)
      expect(boardPage.task.title).to.equal('task1')
      expect(boardPage.task.comments).to.be.an('array').and.not.be.empty
    })

    store.dispatch(actions.$getTaskPage('1'))
  })

  /**
  * Comments
  */

  it('should create comment', () => {
    mockRequest('post', '/comments', mockTask)

    onStoreUpdate(({ boardPage }) => {
      const comment = _.find(boardPage.task.comments, { _id: '5' })
      expect(comment.content).to.equal('text')
    })

    store.dispatch(actions.$createComment({ task_id: '1', content: 'text' }))
  })

  it('should update comment', () => {
    mockRequest('put', '/comments/5', {
      task: { comments: [{ _id: '5', content: 'updated' }] }
    })

    onStoreUpdate(({ boardPage }) => {
      const comment = _.find(boardPage.task.comments, { _id: '5' })
      expect(comment.content).to.equal('updated')
    })

    store.dispatch(actions.$updateComment('5', { task_id: '1', content: 'updated' }))
  })

  it('should delete comment', () => {
    mockRequest('delete', '/comments/5', {
      task: { comments: [] }
    })

    onStoreUpdate(({ boardPage }) => {
      const comment = _.find(boardPage.task.comments, { _id: '5' })
      expect(comment).to.be.undefined
    })

    store.dispatch(actions.$deleteComment('5', { task_id: '1' }))
  })
})

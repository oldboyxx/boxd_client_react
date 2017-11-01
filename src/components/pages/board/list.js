import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CreateItem from 'components/shared/createItem'
import ArchieveItem from 'components/shared/archieveItem'
import EditableProp from 'components/shared/editableProp'
import Tasks from './tasks'

const propTypes = {
  board: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
}

class List extends Component {

  onTaskCreate = () => {
    let $tasks = this.$list.querySelector('.tasks')
    $tasks.scrollTop = $tasks.scrollHeight
  }

  newTaskPosition = () => {
    const tasks = this.$list.querySelectorAll('.taskItem')
    const lastTask = tasks[tasks.length-1]
    const position = lastTask ? +lastTask.getAttribute('data-position') + 1 : 0
    return { position }
  }

  render() {
    const {
      board,
      list,
      tasks,
      users,
      currentUser,
    } = this.props

    return (
      <div
        className="list"
        ref={el => this.$list = el}
        data-id={list._id}
        data-position={list.position}
      >
        <div className="list_inner">

          <div className="list_header">
            <EditableProp item={list} itemType="list" propType="title" />
            <ArchieveItem item={list} itemType="list" />
          </div>

          <Tasks board={board} tasks={tasks} users={users} currentUser={currentUser} />

          <div className="list_create-task-cont">
            <CreateItem
              hasTextarea={true}
              type="task"
              ownerID={{ list_id: list._id }}
              onCreate={this.onTaskCreate}
              apiProps={this.newTaskPosition}
            />
          </div>
        </div>
      </div>
    )
  }
}

List.propTypes = propTypes

export default List

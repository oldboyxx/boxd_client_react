import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { $search } from 'state/global/search/actions'
import TaskItem from 'components/pages/board/taskItem'

const mapDispatchToProps = { $search }

const mapStateToProps = ({ search }) => ({
  tasks: search.tasks
})

const propTypes = {
  tasks: PropTypes.array.isRequired,
  $search: PropTypes.func.isRequired,
}

class NavSearch extends PureComponent {

  state = { dropdownVisible: false }

  hideDropdown() {
    this.setState({ dropdownVisible: false })
    this.$input.value = ''
  }

  componentDidMount() {
    this.dispatchAction = _.debounce(this.dispatchAction, 300)
    document.addEventListener('mouseup', this.handleOutsideClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleOutsideClick)
  }

  handleOutsideClick = e => {
    if (this.state.dropdownVisible && !this.$cont.contains(e.target)) {
      this.hideDropdown()
    }
  }

  dispatchAction = () => {
    const query = { search: this.$input.value }

    this.props.$search(query, {
      success: () => {
        this.setState({ dropdownVisible: true })
      }
    })
  }

  onKeyUp = e => {
    if (e.keyCode === 27) {
      this.hideDropdown()
    } else {
      this.dispatchAction()
    }
  }

  render() {
    const { dropdownVisible } = this.state
    const { tasks } = this.props

    return (
      <div className="navSearch" ref={el => this.$cont = el}>

        <div className="search">
          <input
            type="text"
            className="text-input"
            placeholder="Search tasks by title"
            ref={el => this.$input = el}
            onKeyUp={e => {
              e.persist()
              this.onKeyUp(e)
            }}
          />
          <i className="i-search"></i>
        </div>

        {dropdownVisible ?
          <div className="navSearch_dr">
            <div className="navSearch_dr-title">Search results:</div>

            {_.map(tasks, (task) =>
              <div key={task._id} className="navSearch_dr-task">
                <TaskItem task={task} disableActions={true} newTab={true} />
              </div>
            )}

            {!tasks.length ?
              <div className="navSearch_dr-no-results">No tasks were found :(</div>
            : null}
          </div>
        : null}
      </div>
    )
  }
}

NavSearch.propTypes = propTypes

NavSearch = connect(mapStateToProps, mapDispatchToProps)(NavSearch)

export default NavSearch

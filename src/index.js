import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import PropTypes from 'prop-types'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { id: action.id, text: action.text, isCompleted: false }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return { ...state, isCompleted: !state.isCompleted }
    default:
      return state
  }
}
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SHOW_ALL':
    case 'SHOW_ACTIVE':
    case 'SHOW_COMPLETED':
      return action.type
    default:
      return state
  }
}

const reducer = combineReducers({ todos, visibilityFilter })
const store = createStore(reducer)

const FilterLink = ({ filter, children, currentFilter }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a
      href="/"
      onClick={e => {
        e.preventDefault()
        store.dispatch({ type: filter })
      }}
    >
      {children}
    </a>
  )
}
FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired
}

const getVisibleTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.isCompleted)
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.isCompleted)
    default:
      return []
  }
}

class TodoApp extends React.Component {
  render() {
    const { todos, visibilityFilter } = this.props.store
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
    return (
      <div>
        <input
          ref={input => {
            this.input = input
          }}
        />

        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              /* id: todos.length, */
              id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
              text: this.input.value
            })
            this.input.value = ''
          }}
        >
          +
        </button>

        <ul>
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              role="presentation"
              onClick={() => {
                store.dispatch({ type: 'TOGGLE_TODO', id: todo.id })
              }}
              style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
            >
              {todo.text}
            </li>
          ))}
        </ul>

        <p>
          Show:{' '}
          <FilterLink filter="SHOW_ALL" currentFilter={visibilityFilter}>
            all
          </FilterLink>{' '}
          <FilterLink filter="SHOW_ACTIVE" currentFilter={visibilityFilter}>
            active
          </FilterLink>{' '}
          <FilterLink filter="SHOW_COMPLETED" currentFilter={visibilityFilter}>
            completed
          </FilterLink>
        </p>
      </div>
    )
  }
}
TodoApp.propTypes = {
  store: PropTypes.shape({
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
      }).isRequired
    ).isRequired,
    visibilityFilter: PropTypes.string.isRequired
  }).isRequired
}

const render = () => {
  ReactDOM.render(<TodoApp store={store.getState()} />, document.getElementById('root'))
}

render()
store.subscribe(render)

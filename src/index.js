import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import PropTypes from 'prop-types'

// single todo reducer
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

// array of todos reducer
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

// visibilityFilter reducer
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

// Presentational Component
const AddTodo = ({ onClick }) => {
  let input
  return (
    <div>
      <input
        ref={node => {
          input = node
        }}
      />

      <button
        onClick={() => {
          onClick(input.value)
          input.value = ''
        }}
      >
        +
      </button>
    </div>
  )
}
AddTodo.propTypes = {
  onClick: PropTypes.func.isRequired
}

// Presentational Component
const Todo = ({ text, isCompleted, onClick }) => (
  <li role="presentation" onClick={onClick} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
    {text}
  </li>
)
Todo.propTypes = {
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

// Presentational Component
const TodoList = ({ todos, onTodoClick }) => (
  <ul>{todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}</ul>
)
TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

// Presentational Component
const FilterLink = ({ filter, children, currentFilter, onClick }) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a
      href="/"
      onClick={e => {
        e.preventDefault()
        onClick(filter)
      }}
    >
      {children}
    </a>
  )
}
FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  currentFilter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

// Presentational Component
const Footer = ({ visibilityFilter, onFilterClick }) => (
  <p>
    Show:{' '}
    <FilterLink
      filter="SHOW_ALL"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      all
    </FilterLink>{' '}
    <FilterLink
      filter="SHOW_ACTIVE"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      active
    </FilterLink>{' '}
    <FilterLink
      filter="SHOW_COMPLETED"
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      completed
    </FilterLink>
  </p>
)
Footer.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired
}

// Single Container Component
const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo
      onClick={text =>
        store.dispatch({
          type: 'ADD_TODO',
          id: todos.length,
          /* id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0, */
          text
        })
      }
    />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })}
    />
    <Footer visibilityFilter={visibilityFilter} onFilterClick={filter => store.dispatch({ type: filter })} />
  </div>
)
TodoApp.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired
    }).isRequired
  ).isRequired,
  visibilityFilter: PropTypes.string.isRequired
}

const render = () => {
  ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'))
}

render()
store.subscribe(render)

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

// Combined Component
const AddTodo = () => (
  <div>
    <input
      ref={node => {
        this.input = node
      }}
    />

    <button
      onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: store.getState().todos.length,
          text: this.input.value
        })
        this.input.value = ''
      }}
    >
      +
    </button>
  </div>
)

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

// Container Component
class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = store.getState()

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })}
      />
    )
  }
}

// Presentational Component
const Link = ({ active, onClick, children }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a
      href="/"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}
Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

// Container Component
class FilterLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const state = store.getState()
    const props = this.props
    return (
      <Link active={props.filter === state.visibilityFilter} onClick={() => store.dispatch({ type: props.filter })}>
        {props.children}
      </Link>
    )
  }
}

// Presentational Component
const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">all</FilterLink> <FilterLink filter="SHOW_ACTIVE">active</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED">completed</FilterLink>
  </p>
)

// Presentational Component
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

ReactDOM.render(<TodoApp />, document.getElementById('root'))

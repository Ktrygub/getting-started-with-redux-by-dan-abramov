import { connect } from 'react-redux'

import TodoList from './TodoList'
import toggleTodo from '../redux/actionCreators/toggleTodo'

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

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  onTodoClick: id => {
    dispatch(toggleTodo(id))
  }
})

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

export default VisibleTodoList

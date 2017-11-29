import { connect } from 'react-redux'
import {withRouter} from 'react-router'

import TodoList from './TodoList'
import toggleTodo from '../redux/actionCreators/toggleTodo'

const getVisibleTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case 'all':
      return todos
    case 'active':
      return todos.filter(todo => !todo.isCompleted)
    case 'completed':
      return todos.filter(todo => todo.isCompleted)
    default:
      return []
  }
}

const mapStateToProps = (state, {match}) => ({
  todos: getVisibleTodos(state.todos, match.params.filter || 'all')
})

const mapDispatchToProps = dispatch => ({
  onTodoClick: id => {
    dispatch(toggleTodo(id))
  }
})

const VisibleTodoList = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList))

export default VisibleTodoList

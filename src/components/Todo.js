import React from 'react'
import PropTypes from 'prop-types'

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

export default Todo

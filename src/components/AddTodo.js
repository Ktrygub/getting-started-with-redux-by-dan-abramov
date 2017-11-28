import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import addTodo from '../redux/actionCreators/addTodo'

const AddTodo = ({ id, dispatch }) => {
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
          dispatch(addTodo(input.value, id))
          input.value = ''
        }}
      >
        +
      </button>
    </div>
  )
}
AddTodo.propTypes = {
  id: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({ id: state.todos.length }), null)(AddTodo)

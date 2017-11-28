import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import addTodo from '../redux/actionCreators/addTodo'

const AddTodo = ({ dispatch }) => {
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
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        +
      </button>
    </div>
  )
}
AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(AddTodo)

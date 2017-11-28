import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// reducer
import combineReducer from './redux/reducers/combineReducer'

// components
import TodoApp from './TodoApp'

ReactDOM.render(
  <Provider store={createStore(combineReducer)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)

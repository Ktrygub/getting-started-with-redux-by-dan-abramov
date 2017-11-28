import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import throttle from 'lodash/throttle'

import { saveState, loadState } from './localStorage'

// reducer
import todoApp from './redux/reducers/todoApp'

// components
import App from './components/App'

const persistedState = loadState()
const store = createStore(todoApp, persistedState)

store.subscribe(
  throttle(() => {
    saveState({ todos: store.getState().todos })
  }, 1000)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

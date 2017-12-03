import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, BrowserRouter } from 'react-router-dom'

import App from './App'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter basename="/getting-started-with-redux-by-dan-abramov">
      <Route path="/:filter?" component={App} />
    </BrowserRouter>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.shape().isRequired
}

export default Root

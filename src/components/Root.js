import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, BrowserRouter } from 'react-router-dom'

import App from './App'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" exact component={App} />
    </BrowserRouter>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.shape().isRequired
}

export default Root

import React from 'react'

import FilterLink from './FilterLink'

const Footer = () => (
  <p>
    Show: <FilterLink filter="all">all</FilterLink> <FilterLink filter="active">active</FilterLink>{' '}
    <FilterLink filter="completed">completed</FilterLink>
  </p>
)

export default Footer

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SHOW_ALL':
    case 'SHOW_ACTIVE':
    case 'SHOW_COMPLETED':
      return action.type
    default:
      return state
  }
}

export default visibilityFilter

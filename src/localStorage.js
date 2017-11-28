const saveState = state => {
  try {
    const serialState = JSON.stringify(state)
    localStorage.setItem('state', serialState)
  } catch (error) {
    window.console.log('Error while saving State to localStorage.')
  }
}

const loadState = () => {
  try {
    const state = localStorage.getItem('state')
    if (state === null) {
      return undefined
    }
    return JSON.parse(state)
  } catch (error) {
    return undefined
  }
}

export { saveState, loadState }

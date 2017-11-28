import { v4 } from 'uuid'

const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})

export default addTodo

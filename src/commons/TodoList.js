import Todo from "./Todo"

export default class TodoList {
  constructor(initialValues) {
    if (initialValues) {
      this.values = initialValues.map(
        todo => new Todo(todo.title, todo.completed, todo.id)
      )
    } else {
      this.values = []
    }
  }

  add(todo) {
    return new TodoList(this.values.concat(new Todo(todo.title, todo.completed, todo.id)))
  }

  updateTodo(newValue) {
    const newTodos = [].concat(this.values)
    const indexOfTodo = this.values.indexOf(
      this.values.find(todo => todo.id === newValue.id)
    )
    newTodos[indexOfTodo] = newValue
    return new TodoList(newTodos)
  }

  delete(id) {
    const valuesCopy = [].concat(this.values)
    valuesCopy.splice(
      valuesCopy.indexOf(valuesCopy.find(todo => todo.id === id)),
      1
    )
    return new TodoList(valuesCopy)
  }

  // status must be 'all' or 'completed' or 'active'
  deleteMany(status) {
    if (status.toLowerCase() === 'all') {
      return new TodoList([])
    } else {
      const shouldDeleteCompletedTodos = status.toLowerCase() === 'completed'
      const newTodos = this.values.filter(
        todo => todo.completed !== shouldDeleteCompletedTodos
      )
      return new TodoList(newTodos)
    }
  }

  completeAll() {
    return new TodoList(this.values.map(todo => todo.complete()))
  }

  uncompleteAll() {
    return new TodoList(this.values.map(todo => todo.uncomplete()))
  }

  /**
   *
   * @param {*} status: either 'active', 'completed', or 'all'
   */
  withStatus(status) {
    if (status === 'active') {
      return this.values.filter(todo => !todo.completed)
    } else if (status === 'completed') {
      return this.values.filter(todo => todo.completed)
    } else {
      return this.values
    }
  }

  static countTodosLeft(todos) {
    return todos.reduce((count, todo) => count + (todo.completed ? 0 : 1), 0)
  }
}

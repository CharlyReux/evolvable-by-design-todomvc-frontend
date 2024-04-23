import axios from 'axios'



export default class TodoService {
  constructor(baseApiUrl) {
    this.todos = []
    this.baseApiUrl = baseApiUrl
  }

  getTodos() {
    return this.todos
  }

  async fetch(filter) {
    const response = await axios.get(`${this.baseApiUrl}/todos`, { params: { status:filter } })
    this.todos = response.data.todos
    return this.todos
  }

  async add(title) {
    const response = await axios.post(`${this.baseApiUrl}/todo`, { title })
    const todo = response.data
    this.todos = [...this.todos, todo]
    return this.todos
  }

  async updateTodo(newValue) {
    const response = await axios.put(`${this.baseApiUrl}/todo/${newValue.id}`, {
      title: newValue.title,
      completed: newValue.completed
    })
    const indexOfTodo = this.todos.findIndex(todo => todo.id === newValue.id)
    const temporaryTodos = [...this.todos]
    temporaryTodos[indexOfTodo] = newValue
    this.todos = temporaryTodos
    return this.todos
  }

  async delete(id) {
    const response = await axios.delete(`${this.baseApiUrl}/todo/${id}`)
    const indexOfTodo = this.todos.findIndex(todo => todo.id === id)

    const temporaryTodos = [...this.todos]
    temporaryTodos.splice(indexOfTodo, 1)
    this.todos = temporaryTodos
    return this.todos
  }

  async deleteCompleted() {
    const response = await axios.delete(`${this.baseApiUrl}/todos`, { status: "completed" })
    this.todos = this.todos.filter(
      todo => !todo.completed 
    )
    return this.todos
  }

  async switchTodoCompletedStatus(todo) {
    todo.completed = !todo.completed
    return this.updateTodo(todo)
  }

}

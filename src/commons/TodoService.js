import axios from 'axios'

import Todo from './Todo'
import TodoList from './TodoList'

export default class TodoService {
  constructor(baseApiUrl) {
    this.todos = new TodoList()
    this.baseApiUrl = baseApiUrl
  }

  getTodos() {
    return this.todos
  }

  async fetch() {
    const response = await axios.get(`${this.baseApiUrl}/todos`)
    this.todos = new TodoList(response.data.todos)
    return this.todos
  }

  async add(title) {
    const response = await axios.post(`${this.baseApiUrl}/todo`, { title })
    const todo = response.data
    const newTodosState = this.todos.add(todo)
    this.todos = newTodosState
    console.log(this.todos)
    return this.todos
  }

  async updateTodo(newValue) {
    const response = await axios.put(`${this.baseApiUrl}/todo/${newValue.id}`, {
      title: newValue.title,
      completed: newValue.completed
    })
    console.log(response)
    this.todos = this.todos.updateTodo(newValue)
    return this.todos
  }

  async delete(id) {
    const response = await axios.delete(`${this.baseApiUrl}/todo/${id}`)
    this.todos = this.todos.delete(id)
    return this.todos
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany(status) {
    const response = await axios.delete(`${this.baseApiUrl}/todos`, { status: status })
    this.todos = this.todos.deleteMany(status)
    return this.todos
  }
  async switchTodoCompletedStatus(todo) {
    const newValue =
      todo.completed === true ? todo.uncomplete() : todo.complete()
    return this.updateTodo(newValue)
  }

}

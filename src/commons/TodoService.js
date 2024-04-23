import axios from 'axios'

import Todo from './Todo'
import TodoList from './TodoList'

import Pivo from '@evolvable-by-design/pivo'

export default class TodoService {
  constructor(documentation) {
    this.pivo = new Pivo(documentation)
  }

  static async forApiAtUrl(url) {
    const response = await axios.options(url)

    if (response.status === 200) {
      console.log(response.data)
      return new TodoService(response.data)
    } else {
      const errorMessage = `Impossible to get the documentation of the API at ${url}.`
      alert(errorMessage)
      throw new Error(errorMessage)
    }
  }

  getTodos() {
    return this.todos
  }

  async fetch() {
    return this.todos

  }

  async add(title) {
    return this.todos

  }

  async updateTodo(newValue) {
    return this.todos

  }

  async delete(id) {
    return this.todos

  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany(status) {
    return this.todos

  }

  async switchTodoCompletedStatus(todo) {
    return this.todos

  }

}

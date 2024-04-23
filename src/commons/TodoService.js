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

  }

  async add(title) {

  }

  async updateTodo(newValue) {

  }

  async delete(id) {

  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany(status) {

  }

  async switchTodoCompletedStatus(todo) {

  }

}

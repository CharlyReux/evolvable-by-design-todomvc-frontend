import axios from 'axios'

import Todo from './Todo'
import TodoList from './TodoList'

export default class TodoService {
  constructor (baseApiUrl) {
    this.todos = new TodoList()
    this.baseApiUrl = baseApiUrl
  }

  getTodos () {
    throw new Error('Method not implemented');
  }

  async fetch () {
    throw new Error('Method not implemented');
  }

  async add (title) {
    throw new Error('Method not implemented');

  }

  async updateTodo (newValue) {
    throw new Error('Method not implemented');

  }

  async delete (id) {
    throw new Error('Method not implemented');

  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany (status) {
    throw new Error('Method not implemented');
  }

  async switchStatusOfAllTodos () {
    throw new Error('Method not implemented');
  }
}

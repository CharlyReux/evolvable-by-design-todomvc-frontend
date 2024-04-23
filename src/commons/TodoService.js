import axios from 'axios'

import Todo from './Todo'
import TodoList from './TodoList'

import Pivo from '@evolvable-by-design/pivo'

export default class TodoService {
  constructor(documentation) {
    this.pivo = new Pivo(documentation)
    this.todos = []
    this.todosResources = undefined

    this.fetchOperation = this.pivo
      .get("http://evolvable-by-design.github.io/vocabs/todomvc#TodoCollection")
      .getOrThrow(() => new Error('REST API operation not available'))
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

  async fetch(filter) {
    const parameters = filter ? { ["http://evolvable-by-design.github.io/vocabs/todomvc#status"]: filter } : {}
    const response = await this.fetchOperation.invoke(parameters)
    this.todosResources = response.data
    this.todos = await this.todosResources.getArray("http://evolvable-by-design.github.io/vocabs/todomvc#Todos")
    return this.todos
  }

  async add(title) {
    const addOperation = this.todosResources.getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/create",1)
      .map(relation => relation.operation)
      .getOrThrow(() => new Error('Impossible to get the add operation'))
    const result = addOperation.invoke({ ["http://schema.org/name"]: title })
    this.todos = [...this.todos].concat([result])
    return this.todos
  }

  async updateTodo(todo,newValue) {
    const operation = todo
      .getRelation("http://evolvable-by-design.github.io/vocabs/todomvc#rel/create", 1)
      .map(relation => relation.operation)
      .getOrThrow(() => new Error('REST API operation not available'))

    const response = await operation.invoke({ ...todo.data, ...newValue })
    const newTodoValue = response.data

    return this.todos
  }

  async delete(todo) {
    
    return this.todos
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteCompleted(status) {
    return this.todos

  }

  async switchTodoCompletedStatus(todo) {
    return this.todos
  }

}

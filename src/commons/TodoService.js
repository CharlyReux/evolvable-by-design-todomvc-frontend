import axios from 'axios'

import Todo from './Todo'
import TodoList from './TodoList'

export default class TodoService {
  constructor (baseApiUrl) {
    this.todos = new TodoList()
    this.baseApiUrl = baseApiUrl
  }

  getTodos () {
    return this.todos
  }

  async fetch () {
    const response = await this._httpCaller().get('/todos')
    const untypedTodos = response.data["todos"]
    const todos = untypedTodos.map(
      todo => new Todo(todo.title, todo.completed, todo.id)
    )
    return this._updateTodosState(new TodoList(todos))
  }

  async add (title) {
    const response = await this._httpCaller().post('/todo', { title })
    const todo = response.data

    const newTodosState = this.todos.add(
      new Todo(todo.title, todo.completed, todo.id)
    )

    this._updateTodosState(newTodosState)

    return {
      allTodos: newTodosState,
      createdTodo: todo
    }
  }

  async updateTodo (newValue) {
    await this._httpCaller().put(`/todo/${newValue.id}`, {
      title: newValue.title,
      completed: newValue.completed
    })

    return this._mapAndUpdateTodosState(todos => todos.updateTodo(newValue))
  }

  async delete (id) {
    await this._httpCaller().delete(`/todo/${id}`)
    return this._mapAndUpdateTodosState(todos => todos.delete(id))
  }

  // status must be 'all' or 'completed' or 'active'
  async deleteMany (status) {
    await this._httpCaller().delete(`/todos?status=${status}`)
    return await this.fetch()
  }

  async switchStatusOfAllTodos () {
    const areAllCompleted = this.todos
      .withStatus('all')
      .every(todo => todo.completed)

    const complete = !areAllCompleted

    const statusOfTodosToModify = complete ? 'active' : 'completed'
    const actionToPerformOnTodos = complete
      ? todo => todo.complete()
      : todo => todo.uncomplete()

    const todosToUpdate = this.getTodos().withStatus(statusOfTodosToModify)
    const apiCallsToCompleteTodos = todosToUpdate.map(todo =>
      this.updateTodo(actionToPerformOnTodos(todo))
    )

    const subsequentTodosState = await Promise.all(apiCallsToCompleteTodos)

    if (subsequentTodosState.length > 0) {
      const newTodosState =
        subsequentTodosState[subsequentTodosState.length - 1]
      return this._updateTodosState(newTodosState)
    } else {
      return this.getTodos()
    }
  }

  _httpCaller () {
    return axios.create({
      baseURL: this.baseApiUrl
    })
  }

  _mapAndUpdateTodosState (mapper) {
    const newTodosState = mapper(this.getTodos())
    return this._updateTodosState(newTodosState)
  }

  _updateTodosState (newTodosState) {
    this.todos = newTodosState
    return newTodosState
  }
}

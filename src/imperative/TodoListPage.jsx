import React from 'react'

import * as Config from '../config'
import TodoList from './TodoList'
import TodoService from '../commons/TodoService'

export default class TodoListPage extends React.Component {
  constructor (props) {
    super(props)

    this.todoController = new TodoService(Config.restApi.url)
    console.log('TodoListPage constructor')
    console.log(props.match)
    this.state = this.getInitialState(props)
  }

  componentDidMount () {
    this.todoController.fetch().then(todos => this.updateTodos(todos))
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.filter !== prevProps.match.params.filter) {
      this.setState({ ...this.state, filter: this.props.match.params.filter })
    }
  }

  getInitialState (props) {
    return {
      todos: this.todoController.getTodos(),
      filter: props.match.params.filter
    }
  }

  getTodosToDisplay () {
    return this.state.todos.withStatus(this.state.filter)
  }

  async createTodo (title) {
    const { allTodos } = await this.todoController.add(title)
    this.updateTodos(allTodos)
  }

  async updateTodoTitle (todo, newTitle) {
    const newValue = todo.updateTitle(newTitle)
    const todos = await this.todoController.updateTodo(newValue)
    this.updateTodos(todos)
  }

  async switchTodoCompletedStatus (todo) {
    const newValue =
      todo.completed === true ? todo.uncomplete() : todo.complete()
    const todos = await this.todoController.updateTodo(newValue)
    this.updateTodos(todos)
  }

  async deleteTodo (id) {
    const todos = await this.todoController.delete(id)
    this.updateTodos(todos)
  }

  updateTodos (newTodos) {
    this.setState({ ...this.state, todos: newTodos })
  }

  async clearCompletedTodos () {
    const newTodos = await this.todoController.deleteMany('completed')
    this.updateTodos(newTodos)
  }

  async switchStatusOfAllTodos () {
    const todos = await this.todoController.switchStatusOfAllTodos()
    this.updateTodos(todos)
  }

  render () {
    return (
      <TodoList
        todos={this.getTodosToDisplay()}
        createTodo={title => this.createTodo(title)}
        deleteTodo={id => this.deleteTodo(id)}
        clearCompletedTodos={() => this.clearCompletedTodos()}
        switchStatusOfAllTodos={() => this.switchStatusOfAllTodos()}
        updateTodoTitle={(todo, newTitle) =>
          this.updateTodoTitle(todo, newTitle)
        }
        switchTodoCompletedStatus={todo => this.switchTodoCompletedStatus(todo)}
      />
    )
  }
}

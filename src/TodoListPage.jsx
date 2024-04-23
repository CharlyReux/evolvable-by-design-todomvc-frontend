import React, { useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import * as Config from './config'
import TodoList from './TodoList'
import TodoService from './commons/TodoService'

export default function TodoListPage () {
  const [todoService] = useState(new TodoService(Config.restApi.url))

  const [todos, setTodos] = useState(todoService.getTodos())
  const { filter } = useParams()

  const todosToDisplay = useMemo(() => todos.withStatus(filter), [
    todos,
    filter
  ])

  useEffect(() => {
    todoService.fetch().then(setTodos)
  }, [])

  const createTodo = title =>
    todoService.add(title).then(( allTodos ) => setTodos(allTodos))
  const deleteTodo = id => todoService.delete(id).then(setTodos)
  const clearCompletedTodos = () =>
    todoService.deleteMany('completed').then(setTodos)
 /*  const updateTodoTitle = (todo, newTitle) => {
    const newValue = todo.updateTitle(newTitle)
    todoService.updateTodo(newValue).then(setTodos)
  } */
  const switchTodoCompletedStatus = todo => {
    const newValue =
      todo.completed === true ? todo.uncomplete() : todo.complete()
    todoService.updateTodo(newValue).then(setTodos)
  }

  return (
    <TodoList
      todos={todosToDisplay}
      createTodo={createTodo}
      deleteTodo={deleteTodo}
      clearCompletedTodos={clearCompletedTodos}
      switchTodoCompletedStatus={switchTodoCompletedStatus}
    />
  )
}

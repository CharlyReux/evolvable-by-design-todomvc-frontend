import React, { useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import * as Config from './config'
import TodoList from './TodoList'
import TodoService from './commons/TodoService'

export default function TodoListPage () {
  const [todoService] = useState(new TodoService(Config.restApi.url))

  const [todos, setTodos] = useState(todoService.getTodos())
  const { filter } = useParams()


  useEffect(() => {
    todoService.fetch(filter).then(setTodos)
    console.log('fetching todos')
  }, [filter])

  const createTodo = title =>
    todoService.add(title).then(setTodos)
  const deleteTodo = todo => todoService.delete(todo).then(setTodos)
  const clearCompletedTodos = () =>
    todoService.deleteCompleted('completed').then(setTodos)
  const switchTodoCompletedStatus = todo => {
    todoService.switchTodoCompletedStatus(todo).then(setTodos)
  }

  return (
    <TodoList
      todos={todos}
      createTodo={createTodo}
      deleteTodo={deleteTodo}
      clearCompletedTodos={clearCompletedTodos}
      switchTodoCompletedStatus={switchTodoCompletedStatus}
    />
  )
}

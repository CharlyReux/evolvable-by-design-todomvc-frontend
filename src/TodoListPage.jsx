import React, { useMemo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import * as Config from './config'
import TodoList from './TodoList'
import TodoService from './commons/TodoService'

export default function TodoListPage() {
  const [todoService, setTodoService] = useState()
  useEffect(() => {
    setTodoService(new TodoService(Config.restApi.url))
  }, [])

  return (
    <>
      {todoService ? (
        <TodoListInstantiated todoService={todoService} />
      ) : (
        <p>loading</p>
      )}
    </>
  );
}


function TodoListInstantiated({ todoService }) {
  const [todos, setTodos] = useState([])
  const { filter } = useParams()


  useEffect(() => {
    todoService.fetch(filter).then(setTodos)
  }, [filter, todoService])

  const createTodo = title =>
    todoService.add(title).then(setTodos)
  const deleteTodo = todo => todoService.delete(todo).then(setTodos)
  const clearTodos = filter =>
    todoService.deleteMany(filter).then(setTodos)
  const switchTodoCompletedStatus = todo => {
    todoService.switchTodoCompletedStatus(todo).then(setTodos)
  }
  return <TodoList
    todos={todos}
    createTodo={createTodo}
    deleteTodo={deleteTodo}
    clearTodos={clearTodos}
    switchTodoCompletedStatus={switchTodoCompletedStatus}
    filter={filter}
  />
}
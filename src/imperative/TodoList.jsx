import React from 'react'
import { NavLink } from 'react-router-dom'

import TodoList from '../commons/TodoList'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

export default class TodoListComponent extends React.Component {
  render () {
    const {
      todos,
      createTodo,
      deleteTodo,
      clearCompletedTodos,
      switchStatusOfAllTodos,
      updateTodoTitle,
      switchTodoCompletedStatus
    } = this.props

    const left = TodoList.countTodosLeft(todos)
    const isAnyDone = left < todos.length
    const areAllDone = left === todos.length

    return (
      <React.Fragment>
        <header className='header'>
          <h1>todos</h1>
          <TodoInput onAddTodo={createTodo} />
        </header>

        <section className='main'>
          <input
            id='toggle-all'
            type='checkbox'
            className='toggle-all'
            checked={areAllDone}
            onChange={switchStatusOfAllTodos}
          />
          <label htmlFor='toggle-all' />
          <ul className='todo-list'>
            {todos.map(todo => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onChange={newTitle => updateTodoTitle(todo, newTitle)}
                  onDelete={() => deleteTodo(todo.id)}
                  onDone={() => switchTodoCompletedStatus(todo)}
                />
              )
            })}
          </ul>
        </section>

        <footer className='footer'>
          <span className='todo-count'>
            <strong>{left}</strong> items left
          </span>
          <ul className='filters'>
            <li>
              <NavLink to='/' className={classIsActive}>
                All
              </NavLink>
            </li>
            <li>
              <NavLink to='/active' className={classIsActive}>
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to='/completed' className={classIsActive}>
                Completed
              </NavLink>
            </li>
          </ul>
          {isAnyDone && (
            <button className='clear-completed' onClick={clearCompletedTodos}>
              Clear completed
            </button>
          )}
        </footer>
      </React.Fragment>
    )
  }
}

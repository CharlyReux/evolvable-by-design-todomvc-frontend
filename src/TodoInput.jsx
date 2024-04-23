import React, { useState, useCallback } from 'react'


export default function TodoInput ({ onAddTodo }) {
  const [value, setValue] = useState('')
  
  const onEnter = (event, callback) =>{
    if (event.key === 'Enter') {
      event.preventDefault()
      callback(event)
    }
  }

  const onKeyPress = useCallback(
    event => {
      onEnter(event, () => {
        if (value !== '') {
          onAddTodo(value)
          setValue('')
        }
      })
    },
    [onAddTodo, value, setValue]
  )

  return (
    <input
      className='new-todo'
      placeholder='What needs to be done?'
      onKeyDown={onKeyPress}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}

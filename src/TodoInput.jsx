import { Button, IconButton } from '@mui/material'
import React, { useState, useCallback } from 'react'
import AddIcon from '@mui/icons-material/Add';

export default function TodoInput({ onAddTodo }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [tag, setTag] = useState('')


  return (
    <div style={{ "display": "flex" }} >
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input style={{ "width": "25%", "fontSize": "20px", "paddingLeft": "1px" }}
        className='new-todo'
        placeholder='Author'
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <input style={{ "width": "25%", "fontSize": "20px", "paddingLeft": "1px" }}
        className='new-todo'
        placeholder='Tag'
        value={tag}
        onChange={e => setTag(e.target.value)}
      />
      <IconButton style={{"borderRadius":"0"}} onClick={() => onAddTodo(title, author, tag)} >
        <AddIcon />
      </IconButton>
    </div>
  )
}
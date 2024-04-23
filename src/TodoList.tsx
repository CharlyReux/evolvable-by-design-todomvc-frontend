import React from 'react'
import { NavLink } from 'react-router-dom'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

import TodoList from './commons/TodoList'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

export default function TodoListComponent({
  todos,
  createTodo,
  deleteTodo,
  clearCompletedTodos,
  switchStatusOfAllTodos,
  updateTodoTitle,
  switchTodoCompletedStatus
}) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <>
      <header className='header'>
        <h1>todos</h1>
        <TodoInput onAddTodo={createTodo} />
      </header>



      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {[1, 2, 3].map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemText primary={`Line item ${value}`} />
        </ListItem>
      ))}
    </List>

    </>
  )
}

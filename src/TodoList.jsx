import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Grading from '@mui/icons-material/Grading';
import Unpublished from '@mui/icons-material/Unpublished';
import CheckCircle from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import WithSemanticDataRequired from './commons/with-semantic-data-required'


import TodoInput from './TodoInput'
import { ListItemButton, ListItemIcon } from '@mui/material';
import DetailDialog from './DetailDialog';

export default function TodoListComponent({
  todos,
  createTodo,
  deleteTodo,
  clearTodos,
  switchTodoCompletedStatus,
  getAuthorAndTag,
  filter
}) {
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedTodoTitle, setSelectedTodoTitle] = useState(null);

  const navigate = useNavigate();
  const hash = (object) => {
    return JSON.stringify(object)
  }

  const handleOpen = (todo, title) => () => {
    setSelectedTodo(todo);
    setSelectedTodoTitle(title);
    setOpen(true);
  }

  return (
    <>
      <header className='header'>
        <h1>todos</h1>
        <TodoInput onAddTodo={createTodo} />
      </header>

      <List sx={{ width: '100%' }}>
        {todos.map((todo) => (
          <WithSemanticDataRequired
            key={hash(todo)}
            data={todo}
            mappings={{
              id: "http://evolvable-by-design.github.io/vocabs/todomvc#todoId",
              title: "http://schema.org/name",
              completed: "http://evolvable-by-design.github.io/vocabs/todomvc#completed",
              dueDate: "http://schema.org/DateTime"
            }}
            loader={<div>Loading...</div>}>

            {({ id, title, completed,dueDate }) => (
              <ListItem
                key={id}
                secondaryAction={
                  <div>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="complete" onClick={() => switchTodoCompletedStatus(todo)}>
                      {completed ?
                        <CheckBoxIcon />
                        :
                        <CheckBoxOutlineBlankIcon />
                      }
                    </IconButton>
                  </div>
                }

              >
                <ListItemIcon>
                  <IconButton onClick={handleOpen(todo, title)}>
                    <InfoIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemText disableTypography
                  id={id} primary={
                    <Typography className={completed ? 'text-strike' : null}>{title}</Typography>
                  } />
                <ListItemText disableTypography
                  id={id} primary={
                    <Typography className="date">{dueDate ? dueDate : "No dueDate"}</Typography>
                  } />
              </ListItem>
            )}
          </WithSemanticDataRequired>
        ))}
      </List>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
        <BottomNavigation
          showLabels
          onChange={(event, newfilterStatus) => {
            navigate(`/${newfilterStatus}`);
          }}
        >
          <BottomNavigationAction value="all" label="All" icon={<Grading />} />
          <BottomNavigationAction value="active" label="Active" icon={<Unpublished />} />
          <BottomNavigationAction value="completed" label="Completed" icon={<CheckCircle />} />
        </BottomNavigation>
        <Tooltip title="Remove all todos in that category">
          <IconButton variant="contained" onClick={() => clearTodos(filter)}>
            <RemoveDoneIcon />
          </IconButton>
        </Tooltip>
      </div>
      <DetailDialog todo={selectedTodo} title={selectedTodoTitle} open={open} onClose={() => setOpen(false)} getAuthorAndTag={getAuthorAndTag} />

    </>
  )
}
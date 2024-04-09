import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'todomvc-app-css/index.css'

import * as Config from './config'

import Footer from './Footer'
import TodoListPage from './TodoListPage'

export default function App() {
  return (
    <div className='app'>
      <div className='todoapp'>
        <BrowserRouter>
          <Routes>
            <Route path='/:filter?' element={<TodoListPage/>} />
          </Routes>
        </BrowserRouter>
      </div >

      <Footer />
    </div >
  )
}



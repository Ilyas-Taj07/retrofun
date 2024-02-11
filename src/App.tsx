import React from 'react';
import './App.css';
import Users from './Users';
import Dashboard from './Dashboard';
import { Routes, Route } from 'react-router-dom'
import JoinRoom from './JoinRoom';
import { connect } from 'socket.io-client';
export const socket = connect('https://retrofun-server.onrender.com')

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/home' element={
        <div className='app--container'>
          <Users />
          <Dashboard />
        </div>
      } />
      <Route path='/' element={<JoinRoom />} />
    </Routes>
  )
}

export default App
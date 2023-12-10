import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Project from './project';
import Home from './project/home';
import SignIn from './project/users/signin';
import SignUp from './project/signup';
import Account from './project/users/account';
import GameList from './project/gamelist';
import Search from './project/search';
import Details from './project/details';
import UserList from './project/users/list';
import UserDetails from './project/users/details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Project><Home /></Project>} />
        <Route path="/home" element={<Project><Home /></Project>} />
        <Route path="/signin" element={<Project><SignIn /></Project>} />
        <Route path="/signup" element={<Project><SignUp /></Project>} />
        <Route path="/account" element={<Project><Account /></Project>} />
        <Route path="/gamelist" element={<Project><GameList /></Project>} />
        <Route path="/search" element={<Project><Search /></Project>} />
        <Route path="/search/:searchTerm" element={<Project><Search /></Project>} />
        <Route path="/details/:gameId" element={<Project><Details /></Project>} />
        <Route path="/users" element={<Project><UserList /></Project>} />
        <Route path="/user/:userId" element={<Project><UserDetails /></Project>} />
        {/* 可以根据需要添加更多路由 */}
      </Routes>
    </Router>
  );
}

export default App;

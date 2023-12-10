import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Project from './project';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="project" />} />
        <Route path="/project/*"  element={<Project/>}/>
      </Routes>
    </Router>
  )
}

export default App;
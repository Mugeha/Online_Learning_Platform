import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from "./pages/Courses";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />

      </Routes>
    </Router>
  );
}

export default App;

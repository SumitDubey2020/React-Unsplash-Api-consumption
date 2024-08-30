import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './components/LoginPage/LoginPage';

import './App.css'
import DashBoard from './components/DashBoard/DashBoard';
import Registration from './components/UserRegistration/UserRegistration';

function App() {
 

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Registration/>} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  </Router>
  )
}

export default App

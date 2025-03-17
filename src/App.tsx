import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import { AppointmentProvider } from './contexts/AppointmentContext'
import { Login } from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
      </AppointmentProvider>
    </AuthProvider>
  )
}

export default App

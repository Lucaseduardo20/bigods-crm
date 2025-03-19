import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { AppointmentProvider, useAppointments } from './contexts/AppointmentContext'
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { Appointments } from './pages/Appointments';


function App() {

  return (
    <AuthProvider>
      <AppointmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Appointments" element={<Appointments />} />
        </Routes>
      </Router>
      </AppointmentProvider>
    </AuthProvider>
  )
}

export default App

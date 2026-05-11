import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/UserContext'
import { AppointmentProvider } from './contexts/AppointmentContext'
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { Appointments } from './pages/Appointments';
import { Profile } from './pages/Profile';
import { ScheduleSettings } from './pages/ScheduleSettings';


function App() {

  return (
    <AuthProvider>
      <AppointmentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<ScheduleSettings />} />
        </Routes>
      </Router>
      </AppointmentProvider>
    </AuthProvider>
  )
}

export default App

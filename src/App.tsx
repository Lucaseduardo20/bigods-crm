import { useState } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { AppointmentProvider } from './contexts/AppointmentContext'

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <h1>Ola mundo</h1>
      </AppointmentProvider>
    </AuthProvider>
  )
}

export default App

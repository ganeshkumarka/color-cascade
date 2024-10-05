import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Game from './components/Game'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl font-bold mb-8">Color Cascade</h1>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/game" element={<PrivateRoute><Game /></PrivateRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
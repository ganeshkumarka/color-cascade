import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import Leaderboard from './Leaderboard'

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-8">
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser?.email}</h2>
        <Link to="/game" className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center mb-4">
          Start New Game
        </Link>
        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
      <Leaderboard />
    </div>
  )
}

export default Dashboard
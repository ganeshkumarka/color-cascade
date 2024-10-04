import React, { useContext } from 'react'
import { GameContext } from '../context/GameContext'

const ScoreBoard: React.FC = () => {
  const { state } = useContext(GameContext)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4 text-center">
      <h2 className="text-2xl font-bold mb-2">Score: {state.score}</h2>
      <p className="text-lg mb-2">Level: {state.level}</p>
      <p className="text-lg font-bold text-red-400">Time: {formatTime(state.timeRemaining)}</p>
    </div>
  )
}

export default ScoreBoard
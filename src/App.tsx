import React, { useState } from 'react'
import GameBoard from './components/GameBoard'
import ScoreBoard from './components/ScoreBoard'
import { GameProvider } from './context/GameContext'
import TimerSelector from './components/TimerSelector'
import HighScore from './components/HighScore'

interface HighScores {
  [key: number]: number;
}

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedTime, setSelectedTime] = useState(30)
  const [highScores, setHighScores] = useState<HighScores>({
    30: 0,
    45: 0,
    60: 0,
    90: 0
  })

  const handleGameEnd = (score: number) => {
    setHighScores(prevScores => ({
      ...prevScores,
      [selectedTime]: Math.max(prevScores[selectedTime], score)
    }))
    setGameStarted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-8">Color Cascade</h1>
      {!gameStarted ? (
        <div className="flex flex-col items-center">
          <TimerSelector selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
          <HighScore highScores={highScores} selectedTime={selectedTime} />
        </div>
      ) : (
        <GameProvider initialTime={selectedTime} onGameEnd={handleGameEnd}>
          <div className="flex flex-col md:flex-row items-start justify-center gap-8">
            <div className="flex flex-col items-center">
              <ScoreBoard />
              <GameBoard />
            </div>
            <HighScore highScores={highScores} selectedTime={selectedTime} />
          </div>
        </GameProvider>
      )}
    </div>
  )
}

export default App
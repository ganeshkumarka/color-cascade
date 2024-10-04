import React from 'react'

interface HighScores {
  [key: number]: number;
}

interface HighScoreProps {
  highScores: HighScores;
  selectedTime: number;
}

const HighScore: React.FC<HighScoreProps> = ({ highScores, selectedTime }) => {
  const formatTime = (seconds: number) => {
    return seconds === 90 ? '1:30' : `${seconds}s`
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center mt-4">
      <h2 className="text-2xl font-bold mb-2">High Scores</h2>
      {Object.entries(highScores).map(([time, score]) => (
        <div key={time} className={`mb-2 ${parseInt(time) === selectedTime ? 'text-yellow-400' : ''}`}>
          <span className="font-bold">{formatTime(parseInt(time))}:</span> {score}
        </div>
      ))}
    </div>
  )
}

export default HighScore
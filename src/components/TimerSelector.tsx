import React from 'react'

interface TimerSelectorProps {
  selectedTime: number
  setSelectedTime: (time: number) => void
}

const TimerSelector: React.FC<TimerSelectorProps> = ({ selectedTime, setSelectedTime }) => {
  const timeOptions = [30, 45, 60, 90]

  const formatTime = (seconds: number) => {
    return seconds === 90 ? '1:30' : `${seconds}s`
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Select Game Duration</h2>
      <div className="flex gap-2">
        {timeOptions.map((time) => (
          <button
            key={time}
            className={`px-4 py-2 rounded ${
              selectedTime === time ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setSelectedTime(time)}
          >
            {formatTime(time)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TimerSelector
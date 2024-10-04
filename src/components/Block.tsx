import React from 'react'

interface BlockProps {
  color: string
  onClick: () => void
}

const Block: React.FC<BlockProps> = ({ color, onClick }) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500'
      case 'blue':
        return 'bg-blue-500'
      case 'green':
        return 'bg-green-500'
      case 'yellow':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-700'
    }
  }

  return (
    <div
      className={`w-12 h-12 rounded-md cursor-pointer transition-all duration-300 transform hover:scale-105 ${getColorClass(color)}`}
      onClick={onClick}
    />
  )
}

export default Block
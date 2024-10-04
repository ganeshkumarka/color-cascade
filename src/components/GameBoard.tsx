import React, { useContext, useEffect } from 'react'
import { GameContext } from '../context/GameContext'
import Block from './Block'

const GameBoard: React.FC = () => {
  const { state, dispatch } = useContext(GameContext)

  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    return () => clearInterval(gameLoop)
  }, [dispatch])

  const handleBlockClick = (x: number, y: number) => {
    dispatch({ type: 'CLICK_BLOCK', payload: { x, y } })
  }

  return (
    <div className="grid grid-cols-6 gap-1 bg-gray-800 p-4 rounded-lg">
      {state.board.map((row, y) =>
        row.map((color, x) => (
          <Block
            key={`${x}-${y}`}
            color={color}
            onClick={() => handleBlockClick(x, y)}
          />
        ))
      )}
    </div>
  )
}

export default GameBoard
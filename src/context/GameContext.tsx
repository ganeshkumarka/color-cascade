import React, { createContext, useReducer, Dispatch, useEffect } from 'react'

type Color = 'red' | 'blue' | 'green' | 'yellow' | ''

interface GameState {
  board: Color[][]
  score: number
  level: number
  timeRemaining: number
}

type GameAction =
  | { type: 'TICK' }
  | { type: 'CLICK_BLOCK'; payload: { x: number; y: number } }
  | { type: 'DECREASE_TIME' }

const colors: Color[] = ['red', 'blue', 'green', 'yellow']

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'TICK':
      const tickedBoard = state.board.map((row, y) => {
        if (y === 0) {
          return row.map(() => colors[Math.floor(Math.random() * colors.length)])
        }
        return [...state.board[y - 1]]
      })
      return { ...state, board: tickedBoard }
    case 'CLICK_BLOCK':
      const { x, y } = action.payload
      const clickedColor = state.board[y][x]
      if (!clickedColor) return state

      const floodFill = (x: number, y: number, color: Color, board: Color[][]) => {
        if (
          x < 0 || x >= 6 || y < 0 || y >= 12 ||
          board[y][x] !== color
        ) return

        board[y][x] = ''
        floodFill(x + 1, y, color, board)
        floodFill(x - 1, y, color, board)
        floodFill(x, y + 1, color, board)
        floodFill(x, y - 1, color, board)
      }

      const updatedBoard = state.board.map(row => [...row])
      floodFill(x, y, clickedColor, updatedBoard)

      const clearedBlocks = state.board.flat().filter(Boolean).length - updatedBoard.flat().filter(Boolean).length
      const newScore = state.score + clearedBlocks * 10
      const newLevel = Math.floor(newScore / 1000) + 1

      return {
        ...state,
        board: updatedBoard,
        score: newScore,
        level: newLevel,
      }
    case 'DECREASE_TIME':
      return { ...state, timeRemaining: Math.max(0, state.timeRemaining - 1) }
    default:
      return state
  }
}

interface GameContextProps {
  state: GameState
  dispatch: Dispatch<GameAction>
}

export const GameContext = createContext<GameContextProps>({
  state: { board: [], score: 0, level: 1, timeRemaining: 0 },
  dispatch: () => null,
})

interface GameProviderProps {
  children: React.ReactNode
  initialTime: number
  onGameEnd: (score: number) => void
}

export const GameProvider: React.FC<GameProviderProps> = ({ children, initialTime, onGameEnd }) => {
  const initialState: GameState = {
    board: Array(12).fill(null).map(() => Array(6).fill('')),
    score: 0,
    level: 1,
    timeRemaining: initialTime,
  }

  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    const gameLoop = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    const timer = setInterval(() => {
      dispatch({ type: 'DECREASE_TIME' })
    }, 1000)

    return () => {
      clearInterval(gameLoop)
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (state.timeRemaining === 0) {
      onGameEnd(state.score)
    }
  }, [state.timeRemaining, state.score, onGameEnd])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}
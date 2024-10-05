import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'

interface LeaderboardEntry {
  userId: string
  score: number
  date: string
}

const Leaderboard: React.FC = () => {
  const [leaderboards, setLeaderboards] = useState<{ [key: string]: LeaderboardEntry[] }>({})

  useEffect(() => {
    const fetchLeaderboards = async () => {
      const gameTimes = ['30s', '45s', '60s', '90s']
      const newLeaderboards: { [key: string]: LeaderboardEntry[] } = {}

      for (const time of gameTimes) {
        const q = query(collection(db, 'games', time, 'topScores'), orderBy('score', 'desc'), limit(5))
        const querySnapshot = await getDocs(q)
        newLeaderboards[time] = querySnapshot.docs.map(doc => doc.data() as LeaderboardEntry)
      }

      setLeaderboards(newLeaderboards)
    }

    fetchLeaderboards()
  }, [])

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Leaderboards</h2>
      {Object.entries(leaderboards).map(([time, entries]) => (
        <div key={time} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{time} Game</h3>
          <ul>
            {entries.map((entry, index) => (
              <li key={index} className="mb-1">
                {index + 1}. {entry.userId.slice(0, 6)}... - {entry.score}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
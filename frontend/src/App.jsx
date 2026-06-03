import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [stats, setStats] = useState({
    totalWins: 0,
    totalLosses: 0,
    winRate: 0,
    activeSessions: 0,
  })
  const [sessionActive, setSessionActive] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)

  const API_URL = 'http://localhost:5000/api'

  useEffect(() => {
    fetchStats()
    fetchSessions()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`)
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchSessions = async () => {
    try {
      const response = await axios.get(`${API_URL}/sessions`)
      setSessions(response.data.sessions)
    } catch (error) {
      console.error('Error fetching sessions:', error)
    }
  }

  const startSession = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${API_URL}/sessions`, {
        notes: 'Gaming session'
      })
      setCurrentSessionId(response.data.id)
      setSessionActive(true)
      fetchStats()
      fetchSessions()
    } catch (error) {
      console.error('Error starting session:', error)
    } finally {
      setLoading(false)
    }
  }

  const endSession = async () => {
    try {
      setLoading(true)
      await axios.put(`${API_URL}/sessions/${currentSessionId}`, {
        endTime: new Date(),
        status: 'completed'
      })
      setSessionActive(false)
      setCurrentSessionId(null)
      fetchStats()
      fetchSessions()
    } catch (error) {
      console.error('Error ending session:', error)
    } finally {
      setLoading(false)
    }
  }

  const logWin = async () => {
    try {
      setLoading(true)
      await axios.post(`${API_URL}/results`, {
        sessionId: currentSessionId,
        result: 'win',
        notes: 'Win logged'
      })
      fetchStats()
    } catch (error) {
      console.error('Error logging win:', error)
    } finally {
      setLoading(false)
    }
  }

  const logLoss = async () => {
    try {
      setLoading(true)
      await axios.post(`${API_URL}/results`, {
        sessionId: currentSessionId,
        result: 'loss',
        notes: 'Loss logged'
      })
      fetchStats()
    } catch (error) {
      console.error('Error logging loss:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-white text-center mb-2">
          🎮 Jili Tracker
        </h1>
        <p className="text-center text-purple-200 mb-8">Win/Loss Time Tracker</p>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-white border-opacity-20">
            <h2 className="text-gray-300 text-sm font-semibold mb-2">Total Wins</h2>
            <p className="text-4xl font-bold text-green-400">{stats.totalWins}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-white border-opacity-20">
            <h2 className="text-gray-300 text-sm font-semibold mb-2">Total Losses</h2>
            <p className="text-4xl font-bold text-red-400">{stats.totalLosses}</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-white border-opacity-20">
            <h2 className="text-gray-300 text-sm font-semibold mb-2">Win Rate</h2>
            <p className="text-4xl font-bold text-blue-400">
              {stats.totalWins + stats.totalLosses > 0 
                ? parseFloat(stats.winRate).toFixed(1)
                : 0}%
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 border border-white border-opacity-20">
            <h2 className="text-gray-300 text-sm font-semibold mb-2">Active Sessions</h2>
            <p className="text-4xl font-bold text-yellow-400">{stats.activeSessions}</p>
          </div>
        </div>

        {/* Session Controls */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 border border-white border-opacity-20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Current Session</h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {!sessionActive ? (
              <button
                onClick={startSession}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
              >
                {loading ? 'Starting...' : '▶ Start Session'}
              </button>
            ) : (
              <>
                <button
                  onClick={logWin}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
                >
                  {loading ? 'Processing...' : '✓ Win'}
                </button>
                <button
                  onClick={logLoss}
                  disabled={loading}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
                >
                  {loading ? 'Processing...' : '✗ Loss'}
                </button>
                <button
                  onClick={endSession}
                  disabled={loading}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
                >
                  {loading ? 'Ending...' : '⏹ End Session'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Session History */}
        {sessions.length > 0 && (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 border border-white border-opacity-20">
            <h2 className="text-2xl font-bold text-white mb-6">Session History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-200">
                <thead className="border-b border-gray-400">
                  <tr>
                    <th className="pb-3 font-semibold">Start Time</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className="border-b border-gray-600 hover:bg-white hover:bg-opacity-5">
                      <td className="py-3">{new Date(session.startTime).toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          session.status === 'active' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}>
                          {session.status}
                        </span>
                      </td>
                      <td className="py-3">{session.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

import React from 'react'

function SessionManager({ 
  sessionActive, 
  loading, 
  onStartSession, 
  onEndSession, 
  onLogWin, 
  onLogLoss,
  stats 
}) {
  return (
    <div className="space-y-8">
      {/* Session Control Panel */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 border border-white border-opacity-20">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {sessionActive ? '⏱️ Active Gaming Session' : '🎮 Start New Session'}
        </h2>
        
        {!sessionActive ? (
          <div className="flex justify-center">
            <button
              onClick={onStartSession}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 text-lg"
            >
              {loading ? '⏳ Starting...' : '▶️ Start Gaming Session'}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Game Controls */}
            <div className="bg-white bg-opacity-5 rounded-lg p-6 border border-white border-opacity-10">
              <p className="text-center text-gray-300 mb-6 text-lg">
                Quick Action: Log your win or loss
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center flex-wrap">
                <button
                  onClick={onLogWin}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 flex items-center gap-2"
                >
                  <span className="text-2xl">✓</span>
                  {loading ? 'Processing...' : 'WIN'}
                </button>
                <button
                  onClick={onLogLoss}
                  disabled={loading}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 flex items-center gap-2"
                >
                  <span className="text-2xl">✗</span>
                  {loading ? 'Processing...' : 'LOSS'}
                </button>
              </div>
            </div>

            {/* Session Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10 text-center">
                <p className="text-gray-400 text-sm mb-1">Session Wins</p>
                <p className="text-3xl font-bold text-green-400">{stats.totalWins}</p>
              </div>
              <div className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10 text-center">
                <p className="text-gray-400 text-sm mb-1">Session Losses</p>
                <p className="text-3xl font-bold text-red-400">{stats.totalLosses}</p>
              </div>
              <div className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10 text-center">
                <p className="text-gray-400 text-sm mb-1">This Session Total</p>
                <p className="text-3xl font-bold text-blue-400">{stats.totalResults}</p>
              </div>
            </div>

            {/* End Session Button */}
            <div className="flex justify-center">
              <button
                onClick={onEndSession}
                disabled={loading}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
              >
                {loading ? '⏳ Ending...' : '⏹️ End Session'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 border border-green-400 border-opacity-30">
          <p className="text-green-100 text-sm mb-2">✓ Total Wins</p>
          <p className="text-4xl font-bold text-white">{stats.totalWins}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-6 border border-red-400 border-opacity-30">
          <p className="text-red-100 text-sm mb-2">✗ Total Losses</p>
          <p className="text-4xl font-bold text-white">{stats.totalLosses}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 border border-blue-400 border-opacity-30">
          <p className="text-blue-100 text-sm mb-2">📊 Win Rate</p>
          <p className="text-4xl font-bold text-white">
            {stats.totalResults > 0 ? parseFloat(stats.winRate).toFixed(1) : 0}%
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 border border-purple-400 border-opacity-30">
          <p className="text-purple-100 text-sm mb-2">🎮 Total Games</p>
          <p className="text-4xl font-bold text-white">{stats.totalResults}</p>
        </div>
      </div>

      {/* Session Tips */}
      <div className="bg-yellow-500 bg-opacity-10 rounded-lg shadow-lg p-6 border border-yellow-400 border-opacity-30">
        <p className="text-yellow-300 font-bold mb-2">💡 Pro Tips:</p>
        <ul className="text-gray-300 space-y-1 text-sm">
          <li>• Click WIN after each successful game</li>
          <li>• Click LOSS after each failed game</li>
          <li>• Use END SESSION to save your session and view statistics</li>
          <li>• Check your Dashboard for overall performance analysis</li>
        </ul>
      </div>
    </div>
  )
}

export default SessionManager

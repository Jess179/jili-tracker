// =====================================
// ARENA PLUS PHILIPPINES - REAL-TIME GAME TRACKER
// =====================================

// NOTE: This currently uses SIMULATED data for demo purposes.
// To get REAL-TIME data from Arena Plus Philippines, you need to:
// 1. Get API credentials from Arena Plus
// 2. Replace the simulateDataUpdate() function with actual API calls
// 3. Update the API endpoint to your Arena Plus API source

// Sample game data - Arena Plus Philippines Popular Games
const gameDatabase = [
    // JILI GAMES (Popular)
    { id: 1, name: 'Super Ace', percentage: 85.2, players: 3241, trend: 'up', lastUpdate: new Date() },
    { id: 2, name: 'Crazy Monkey', percentage: 78.5, players: 2856, trend: 'up', lastUpdate: new Date() },
    { id: 3, name: 'Lucky God', percentage: 82.1, players: 2543, trend: 'stable', lastUpdate: new Date() },
    { id: 4, name: 'Golden Beauty', percentage: 79.8, players: 2105, trend: 'up', lastUpdate: new Date() },
    { id: 5, name: 'Fruit Party', percentage: 76.3, players: 1892, trend: 'down', lastUpdate: new Date() },
    
    // CQ9 GAMES (Popular)
    { id: 6, name: 'Fire Kirin', percentage: 81.7, players: 3456, trend: 'up', lastUpdate: new Date() },
    { id: 7, name: 'Golden Toad', percentage: 84.2, players: 2987, trend: 'up', lastUpdate: new Date() },
    { id: 8, name: 'Hunting Treasure', percentage: 77.9, players: 2345, trend: 'stable', lastUpdate: new Date() },
    
    // SPRIBE GAMES
    { id: 9, name: 'Aviator', percentage: 72.5, players: 4123, trend: 'up', lastUpdate: new Date() },
    { id: 10, name: 'Turbo', percentage: 68.9, players: 3098, trend: 'down', lastUpdate: new Date() },
    
    // PRAGMATIC PLAY GAMES
    { id: 11, name: 'Gates of Olympus', percentage: 80.3, players: 2654, trend: 'up', lastUpdate: new Date() },
    { id: 12, name: 'Sweet Bonanza', percentage: 83.7, players: 3012, trend: 'up', lastUpdate: new Date() },
    { id: 13, name: 'Starlight Princess', percentage: 79.1, players: 2789, trend: 'stable', lastUpdate: new Date() },
    { id: 14, name: 'Aztec Blaze', percentage: 75.4, players: 2134, trend: 'down', lastUpdate: new Date() },
    
    // WAZDAN GAMES
    { id: 15, name: 'Book of Relics', percentage: 81.8, players: 1876, trend: 'up', lastUpdate: new Date() },
    { id: 16, name: 'Burning Reels', percentage: 77.2, players: 1543, trend: 'stable', lastUpdate: new Date() },
    
    // NETENT GAMES
    { id: 17, name: 'Starburst XXL', percentage: 78.6, players: 2456, trend: 'up', lastUpdate: new Date() },
    { id: 18, name: 'Divine Fortune', percentage: 82.4, players: 2098, trend: 'up', lastUpdate: new Date() },
    
    // MICROGAMING GAMES
    { id: 19, name: 'Mega Moolah', percentage: 86.1, players: 2341, trend: 'up', lastUpdate: new Date() },
    { id: 20, name: 'Immortal Romance', percentage: 80.9, players: 1987, trend: 'stable', lastUpdate: new Date() },
];

let currentGames = [...gameDatabase];
let currentSortBy = 'percentage-high';
let currentSearchTerm = '';
let isRealTimeMode = false; // Set to true when connecting to real API

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateDashboard();
    
    // Auto-refresh every 5 seconds
    // Adjust interval based on API rate limits (usually min 3-5 seconds)
    setInterval(simulateDataUpdate, 5000);
});

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const refreshBtn = document.getElementById('refreshBtn');

    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        updateDashboard();
    });

    sortSelect.addEventListener('change', (e) => {
        currentSortBy = e.target.value;
        updateDashboard();
    });

    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('refreshing');
        simulateDataUpdate();
        setTimeout(() => {
            refreshBtn.classList.remove('refreshing');
        }, 1000);
    });
}

// =====================================
// IMPORTANT: FOR REAL-TIME DATA
// =====================================
// Replace this entire function with your actual API call:
// 
// async function simulateDataUpdate() {
//     try {
//         const response = await fetch('YOUR_ARENA_PLUS_API_ENDPOINT', {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer YOUR_API_KEY',
//                 'Content-Type': 'application/json'
//             }
//         });
//         
//         if (!response.ok) throw new Error('API Error');
//         const data = await response.json();
//         
//         // Map API response to game format
//         currentGames = data.games.map(game => ({
//             id: game.gameId,
//             name: game.gameName,
//             percentage: game.winPercentage,
//             players: game.activePlayers,
//             trend: calculateTrend(game.previousPercentage, game.winPercentage),
//             lastUpdate: new Date(game.lastUpdated)
//         }));
//         
//         updateDashboard();
//     } catch (error) {
//         console.error('Failed to fetch real-time data:', error);
//     }
// }

// Simulate real-time data updates (DEMO MODE)
function simulateDataUpdate() {
    if (isRealTimeMode) {
        // TODO: Replace with actual API call
        return;
    }

    // For DEMO: Add small random variations to percentages
    currentGames.forEach(game => {
        // Simulate percentage changes (±1% fluctuation)
        const variation = (Math.random() - 0.5) * 2;
        game.percentage = Math.max(50, Math.min(100, game.percentage + variation));
        game.percentage = Math.round(game.percentage * 10) / 10;

        // Simulate player count changes (±200 players)
        const playerVariation = Math.floor((Math.random() - 0.5) * 400);
        game.players = Math.max(100, game.players + playerVariation);

        // Random trend changes (less frequently)
        if (Math.random() > 0.7) {
            const trends = ['up', 'down', 'stable'];
            game.trend = trends[Math.floor(Math.random() * trends.length)];
        }

        game.lastUpdate = new Date();
    });

    updateDashboard();
}

// Calculate trend based on percentage change
function calculateTrend(previousPercentage, currentPercentage) {
    if (!previousPercentage) return 'stable';
    
    const change = currentPercentage - previousPercentage;
    if (change > 1) return 'up';
    if (change < -1) return 'down';
    return 'stable';
}

// Update the entire dashboard
function updateDashboard() {
    const filteredGames = filterGames();
    const sortedGames = sortGames(filteredGames);
    
    updateTable(sortedGames);
    updateStats(sortedGames);
    updateTopPerformers(sortedGames);
    updateTime();
}

// Filter games based on search term
function filterGames() {
    if (!currentSearchTerm) {
        return [...currentGames];
    }
    
    return currentGames.filter(game => 
        game.name.toLowerCase().includes(currentSearchTerm)
    );
}

// Sort games based on current sort option
function sortGames(games) {
    const sorted = [...games];
    
    switch(currentSortBy) {
        case 'percentage-high':
            return sorted.sort((a, b) => b.percentage - a.percentage);
        case 'percentage-low':
            return sorted.sort((a, b) => a.percentage - b.percentage);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'players':
            return sorted.sort((a, b) => b.players - a.players);
        default:
            return sorted;
    }
}

// Update the games table
function updateTable(games) {
    const tbody = document.getElementById('gamesTableBody');
    tbody.innerHTML = '';

    games.forEach((game, index) => {
        const row = document.createElement('tr');
        
        const percentageClass = game.percentage >= 80 ? 'high-percentage' : 
                               game.percentage >= 70 ? 'medium-percentage' : 'low-percentage';
        
        const barFill = (game.percentage / 100) * 100;
        
        const trendIcon = game.trend === 'up' ? '📈' : 
                         game.trend === 'down' ? '📉' : '➡️';
        
        const trendClass = game.trend === 'up' ? 'trend-up' : 
                          game.trend === 'down' ? 'trend-down' : 'trend-stable';
        
        row.innerHTML = `
            <td class="rank">#${index + 1}</td>
            <td class="name"><strong>${game.name}</strong></td>
            <td class="percentage">
                <div class="percentage-bar ${percentageClass}">
                    <div class="bar-container">
                        <div class="bar-fill" style="width: ${barFill}%"></div>
                    </div>
                    <span class="percentage-value">${game.percentage.toFixed(1)}%</span>
                </div>
            </td>
            <td class="players">${game.players.toLocaleString()}</td>
            <td class="status">
                <span class="status-badge status-active">🟢 Active</span>
            </td>
            <td class="trend">
                <span class="${trendClass}">${trendIcon}</span>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Update statistics cards
function updateStats(games) {
    const totalGames = games.length;
    const avgPercentage = (games.reduce((sum, g) => sum + g.percentage, 0) / totalGames).toFixed(1);
    const highestRate = Math.max(...games.map(g => g.percentage)).toFixed(1);
    const lowestRate = Math.min(...games.map(g => g.percentage)).toFixed(1);

    document.getElementById('totalGames').textContent = totalGames;
    document.getElementById('avgPercentage').textContent = avgPercentage + '%';
    document.getElementById('highestRate').textContent = highestRate + '%';
    document.getElementById('lowestRate').textContent = lowestRate + '%';
}

// Update top performers cards
function updateTopPerformers(games) {
    const topPerformers = [...games].sort((a, b) => b.percentage - a.percentage).slice(0, 3);
    const container = document.getElementById('topPerformers');
    container.innerHTML = '';

    topPerformers.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        const medals = ['🥇', '🥈', '🥉'];
        
        card.innerHTML = `
            <div class="game-card-header">
                <div class="game-card-title">${game.name}</div>
                <div class="game-card-rank">${medals[index]} #${index + 1}</div>
            </div>
            <div class="game-card-stat">
                <span class="game-card-label">Win Percentage:</span>
                <span class="game-card-value" style="color: #10b981;">${game.percentage.toFixed(1)}%</span>
            </div>
            <div class="game-card-stat">
                <span class="game-card-label">Active Players:</span>
                <span class="game-card-value">${game.players.toLocaleString()}</span>
            </div>
            <div class="game-card-stat">
                <span class="game-card-label">Performance:</span>
                <span class="game-card-value">
                    ${game.trend === 'up' ? '📈 Increasing' : game.trend === 'down' ? '📉 Decreasing' : '➡️ Stable'}
                </span>
            </div>
            <div class="game-card-stat">
                <span class="game-card-label">Last Updated:</span>
                <span class="game-card-value" style="font-size: 0.9em;">${formatTime(game.lastUpdate)}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Update time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('lastUpdate').textContent = timeString;
    document.getElementById('footerTime').textContent = timeString;
}

// Format time
function formatTime(date) {
    return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Sample game data - In production, this would come from an API
const gameDatabase = [
    { id: 1, name: 'Dragon Gold', percentage: 87.5, players: 2341, trend: 'up', lastUpdate: new Date() },
    { id: 2, name: 'Golden Jaguar', percentage: 76.3, players: 1856, trend: 'down', lastUpdate: new Date() },
    { id: 3, name: 'Book of Fortune', percentage: 72.8, players: 1543, trend: 'stable', lastUpdate: new Date() },
    { id: 4, name: 'Phoenix Rising', percentage: 85.2, players: 2105, trend: 'up', lastUpdate: new Date() },
    { id: 5, name: 'Gems Rush', percentage: 68.9, players: 892, trend: 'down', lastUpdate: new Date() },
    { id: 6, name: 'Lucky King', percentage: 79.4, players: 1623, trend: 'up', lastUpdate: new Date() },
    { id: 7, name: 'Aztec Treasures', percentage: 74.6, players: 1345, trend: 'stable', lastUpdate: new Date() },
    { id: 8, name: 'Ocean Riches', percentage: 81.7, players: 1987, trend: 'up', lastUpdate: new Date() },
    { id: 9, name: 'Temple Quest', percentage: 71.2, players: 1102, trend: 'down', lastUpdate: new Date() },
    { id: 10, name: 'Golden Egg', percentage: 88.1, players: 2456, trend: 'up', lastUpdate: new Date() },
    { id: 11, name: 'Safari Gold', percentage: 75.9, players: 1234, trend: 'stable', lastUpdate: new Date() },
    { id: 12, name: 'Slots Paradise', percentage: 82.3, players: 1789, trend: 'up', lastUpdate: new Date() },
];

let currentGames = [...gameDatabase];
let currentSortBy = 'percentage-high';
let currentSearchTerm = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateDashboard();
    setInterval(simulateDataUpdate, 5000); // Auto-refresh every 5 seconds
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

// Simulate real-time data updates
function simulateDataUpdate() {
    // Add small random variations to percentages
    currentGames.forEach(game => {
        const variation = (Math.random() - 0.5) * 3; // -1.5 to +1.5
        game.percentage = Math.max(50, Math.min(100, game.percentage + variation));
        game.percentage = Math.round(game.percentage * 10) / 10;

        // Random player count variation
        const playerVariation = Math.floor((Math.random() - 0.5) * 400);
        game.players = Math.max(100, game.players + playerVariation);

        // Random trend
        const trends = ['up', 'down', 'stable'];
        game.trend = trends[Math.floor(Math.random() * trends.length)];

        game.lastUpdate = new Date();
    });

    updateDashboard();
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

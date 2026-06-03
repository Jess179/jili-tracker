// =====================================
// ARENA PLUS PHILIPPINES - REAL-TIME GAME TRACKER
// Uses Arena Plus API to fetch live game data
// =====================================

// Configuration - Use environment variables or local storage
const CONFIG = {
    // Set these via environment variables or update locally
    API_BASE_URL: localStorage.getItem('apiBaseUrl') || 'https://api.arenaplus.com', // Update with actual Arena Plus API
    API_KEY: localStorage.getItem('apiKey') || '', // Will be set from environment or user input
    API_ENDPOINT: '/v1/games', // Adjust based on Arena Plus API documentation
    REFRESH_INTERVAL: 5000, // 5 seconds - adjust based on API rate limits
};

let currentGames = [];
let currentSortBy = 'percentage-high';
let currentSearchTerm = '';
let isLoading = false;
let apiConnected = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkAPIConfiguration();
    fetchGamesFromArenaPlus();
    
    // Auto-refresh every 5 seconds
    setInterval(fetchGamesFromArenaPlus, CONFIG.REFRESH_INTERVAL);
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
        fetchGamesFromArenaPlus();
        setTimeout(() => {
            refreshBtn.classList.remove('refreshing');
        }, 1000);
    });
}

// =====================================
// MAIN: Fetch Games from Arena Plus API
// =====================================
async function fetchGamesFromArenaPlus() {
    if (isLoading) return;
    
    isLoading = true;
    
    try {
        // Build the API URL
        const apiUrl = `${CONFIG.API_BASE_URL}${CONFIG.API_ENDPOINT}`;
        
        console.log('Fetching from Arena Plus API:', apiUrl);
        
        // Prepare headers
        const headers = {
            'Content-Type': 'application/json',
        };
        
        // Add authentication if API key exists
        if (CONFIG.API_KEY) {
            headers['Authorization'] = `Bearer ${CONFIG.API_KEY}`;
            // Or use other auth method if different:
            // headers['X-API-Key'] = CONFIG.API_KEY;
        }
        
        // Make the API request
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers,
            credentials: 'include' // Include cookies if needed
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Parse and map Arena Plus response to our format
        currentGames = parseArenaPlustResponse(data);
        apiConnected = true;
        
        // Update UI
        updateDashboard();
        showStatusMessage('✅ Real-time data updated from Arena Plus', 'success');
        
    } catch (error) {
        console.error('Error fetching from Arena Plus API:', error);
        apiConnected = false;
        showStatusMessage(`❌ Failed to fetch data: ${error.message}`, 'error');
        
        // If API fails, try using sample data for demo
        if (currentGames.length === 0) {
            loadSampleData();
            updateDashboard();
        }
    } finally {
        isLoading = false;
    }
}

// =====================================
// Parse Arena Plus API Response
// Adjust this function based on actual API response format
// =====================================
function parseArenaPlustResponse(apiResponse) {
    try {
        let games = [];
        
        // Handle different possible API response formats
        // Adjust this based on actual Arena Plus API structure
        
        if (Array.isArray(apiResponse)) {
            // If API returns array directly
            games = apiResponse;
        } else if (apiResponse.games && Array.isArray(apiResponse.games)) {
            // If API returns { games: [...] }
            games = apiResponse.games;
        } else if (apiResponse.data && Array.isArray(apiResponse.data)) {
            // If API returns { data: [...] }
            games = apiResponse.data;
        } else if (apiResponse.result && Array.isArray(apiResponse.result)) {
            // If API returns { result: [...] }
            games = apiResponse.result;
        } else {
            throw new Error('Unknown API response format');
        }
        
        // Map API fields to our game object format
        // Adjust field names based on actual Arena Plus API response
        return games.map((game, index) => {
            // Try to match common field names
            const id = game.id || game.gameId || game.game_id || index + 1;
            const name = game.name || game.gameName || game.game_name || 'Unknown Game';
            const percentage = parseFloat(game.percentage || game.winRate || game.win_percentage || game.payout || 0);
            const players = parseInt(game.players || game.activePlayers || game.active_players || game.user_count || 0);
            const trend = game.trend || calculateTrendFromHistory(game);
            
            return {
                id: id,
                name: name,
                percentage: Math.max(0, Math.min(100, percentage)), // Ensure 0-100%
                players: Math.max(0, players), // Ensure positive
                trend: trend,
                lastUpdate: new Date(game.lastUpdated || game.updated_at || new Date()),
                rawData: game // Keep original data for debugging
            };
        });
        
    } catch (error) {
        console.error('Error parsing Arena Plus response:', error);
        console.log('Raw API response:', apiResponse);
        return [];
    }
}

// Calculate trend if not provided by API
function calculateTrendFromHistory(game) {
    // If API provides trend, use it
    if (game.trend) return game.trend;
    
    // Try to calculate from previous percentage
    if (game.previousPercentage && game.percentage) {
        const change = game.percentage - game.previousPercentage;
        if (change > 1) return 'up';
        if (change < -1) return 'down';
    }
    
    return 'stable';
}

// =====================================
// Load Sample Data (Fallback)
// =====================================
function loadSampleData() {
    currentGames = [
        { id: 1, name: 'Super Ace', percentage: 85.2, players: 3241, trend: 'up', lastUpdate: new Date() },
        { id: 2, name: 'Crazy Monkey', percentage: 78.5, players: 2856, trend: 'up', lastUpdate: new Date() },
        { id: 3, name: 'Lucky God', percentage: 82.1, players: 2543, trend: 'stable', lastUpdate: new Date() },
        { id: 4, name: 'Golden Beauty', percentage: 79.8, players: 2105, trend: 'up', lastUpdate: new Date() },
        { id: 5, name: 'Fruit Party', percentage: 76.3, players: 1892, trend: 'down', lastUpdate: new Date() },
        { id: 6, name: 'Fire Kirin', percentage: 81.7, players: 3456, trend: 'up', lastUpdate: new Date() },
        { id: 7, name: 'Golden Toad', percentage: 84.2, players: 2987, trend: 'up', lastUpdate: new Date() },
        { id: 8, name: 'Hunting Treasure', percentage: 77.9, players: 2345, trend: 'stable', lastUpdate: new Date() },
        { id: 9, name: 'Aviator', percentage: 72.5, players: 4123, trend: 'up', lastUpdate: new Date() },
        { id: 10, name: 'Gates of Olympus', percentage: 80.3, players: 2654, trend: 'up', lastUpdate: new Date() },
        { id: 11, name: 'Sweet Bonanza', percentage: 83.7, players: 3012, trend: 'up', lastUpdate: new Date() },
        { id: 12, name: 'Starlight Princess', percentage: 79.1, players: 2789, trend: 'stable', lastUpdate: new Date() },
    ];
}

// =====================================
// Check API Configuration
// =====================================
function checkAPIConfiguration() {
    const configDiv = document.getElementById('apiConfigStatus');
    
    if (!CONFIG.API_KEY && CONFIG.API_BASE_URL === 'https://api.arenaplus.com') {
        console.warn('⚠️ API Configuration not set. Using sample data for demo.');
        showStatusMessage('⚠️ No Arena Plus API configured. Using demo data.', 'warning');
    }
}

// =====================================
// Show Status Message
// =====================================
function showStatusMessage(message, type = 'info') {
    console.log(`[${type.toUpperCase()}]`, message);
    
    // You can add a visual indicator on the page if desired
    const statusEl = document.getElementById('apiStatus');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = `status-${type}`;
    }
}

// =====================================
// Set API Configuration (For users)
// =====================================
function setAPIConfiguration(baseUrl, apiKey) {
    if (baseUrl) {
        CONFIG.API_BASE_URL = baseUrl;
        localStorage.setItem('apiBaseUrl', baseUrl);
    }
    if (apiKey) {
        CONFIG.API_KEY = apiKey;
        localStorage.setItem('apiKey', apiKey);
    }
    
    console.log('API Configuration updated');
    fetchGamesFromArenaPlus();
}

// =====================================
// Update the entire dashboard
// =====================================
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

    if (games.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: #888;">No games found. Check API connection.</td></tr>';
        return;
    }

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
    if (games.length === 0) {
        document.getElementById('totalGames').textContent = '0';
        document.getElementById('avgPercentage').textContent = '0%';
        document.getElementById('highestRate').textContent = '0%';
        document.getElementById('lowestRate').textContent = '0%';
        return;
    }

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

    if (topPerformers.length === 0) {
        container.innerHTML = '<div style="color: #888; grid-column: 1/-1; text-align: center; padding: 20px;">No games to display</div>';
        return;
    }

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

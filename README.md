# 🎮 Arena Plus Real-Time Game Tracker

A modern, real-time web dashboard for viewing and tracking Arena Plus game performance percentages. Instantly see which games have the highest and lowest win rates!

## ✨ Features

- **⚡ Real-Time Data Updates**: Game percentages update automatically every 5 seconds
- **🔍 Advanced Filtering**: Search games by name instantly
- **📊 Smart Sorting**: Sort by:
  - Highest win percentage
  - Lowest win percentage
  - Game name (A-Z)
  - Most active players
- **🎨 Visual Indicators**: 
  - Color-coded percentage bars (Green/Yellow/Red)
  - Trend indicators (📈 Up, 📉 Down, ➡️ Stable)
- **📈 Performance Metrics**:
  - Total games count
  - Average win percentage
  - Highest and lowest rates
- **🏆 Top Performers Section**: Display top 3 performing games with detailed cards
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **⏰ Live Clock**: Shows last update time across the dashboard

## 📁 Project Structure

```
jili-tracker/
├── index.html       # Main HTML dashboard
├── styles.css       # Complete CSS styling & animations
├── script.js        # JavaScript for real-time functionality
└── README.md        # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- No external dependencies required!

### Quick Start

1. **Clone/Download the Repository**
   ```bash
   git clone https://github.com/Jess179/jili-tracker.git
   cd jili-tracker
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - The dashboard will load with sample data
   - Auto-refresh will start immediately (every 5 seconds)

3. **Enable GitHub Pages** (Optional - for live hosting)
   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Your site will be live at: `https://Jess179.github.io/jili-tracker/`

## 📊 Dashboard Components

### Header Section
- Eye-catching title and subtitle
- Real-time last update timestamp
- Professional gradient design

### Control Panel
- **Search Box**: Filter games by name in real-time
- **Sort Dropdown**: Change sorting order instantly
- **Refresh Button**: Manual refresh with visual feedback

### Statistics Cards
- **Total Games**: Number of available games
- **Avg Percentage**: Average win rate across all games
- **Highest Rate**: Best performing game
- **Lowest Rate**: Lowest performing game

### Games Table
Interactive table displaying:
| Column | Description |
|--------|-------------|
| Rank | Position based on current sorting |
| Game Name | Name of the game |
| Win % | Percentage with animated visual bar |
| Active Players | Current player count |
| Status | Current game status |
| Trend | Performance direction indicator |

### Top Performers Cards
Featured section showing top 3 games with:
- 🥇🥈🥉 Medal rankings
- Current win percentage
- Active player count
- Performance trend
- Last update timestamp

## 🎨 Color Coding System

| Range | Color | Meaning |
|-------|-------|---------|
| 80%+ | 🟢 Green | Excellent win rate |
| 70-80% | 🟡 Yellow | Good win rate |
| <70% | 🔴 Red | Lower win rate |

## ⚙️ Configuration

### Change Auto-Refresh Interval
Edit `script.js` line 23:
```javascript
setInterval(simulateDataUpdate, 5000); // Change 5000 to desired milliseconds (in ms)
```
- 5000 = 5 seconds (default)
- 10000 = 10 seconds
- 1000 = 1 second

### Modify Percentage Thresholds
Edit `script.js` in `updateTable()` function:
```javascript
const percentageClass = game.percentage >= 80 ? 'high-percentage' : 
                       game.percentage >= 70 ? 'medium-percentage' : 'low-percentage';
```

### Add Custom Games
Edit `script.js` and add to `gameDatabase` array:
```javascript
{ id: 13, name: 'Your Game Name', percentage: 75.5, players: 1500, trend: 'up', lastUpdate: new Date() }
```

## 🔌 API Integration

To connect real Arena Plus API data:

### Step 1: Replace simulateDataUpdate function
```javascript
async function simulateDataUpdate() {
    try {
        const response = await fetch('/api/games'); // Your API endpoint
        const data = await response.json();
        
        // Map your API response to game format
        currentGames = data.map(game => ({
            id: game.id,
            name: game.gameName,
            percentage: game.winRate,
            players: game.activePlayers,
            trend: game.trend,
            lastUpdate: new Date()
        }));
        
        updateDashboard();
    } catch (error) {
        console.error('Failed to fetch game data:', error);
    }
}
```

### Step 2: Update refresh interval to match your API limits
- If API has rate limits, adjust refresh interval accordingly

### Example API Response Format
```json
[
    {
        "id": 1,
        "gameName": "Dragon Gold",
        "winRate": 87.5,
        "activePlayers": 2341,
        "trend": "up"
    }
]
```

## 🎯 How It Works

1. **Initialization**: Page loads with sample game data
2. **Display**: Dashboard renders with all statistics and tables
3. **Auto-Update**: Every 5 seconds, percentages and player counts update
4. **User Interaction**: 
   - Type to search games
   - Change sort order
   - Click refresh for immediate update
5. **Real-Time Display**: All changes reflected instantly

## 🎨 Customization

### Change Theme Colors
Edit `styles.css` variables:
```css
/* Primary gradient (header/buttons) */
background: linear-gradient(135deg, #e94560 0%, #f97316 100%);

/* High percentage color (Green) */
color: #10b981;

/* Low percentage color (Red) */
color: #f87171;
```

### Responsive Breakpoints
The dashboard is optimized for:
- 📱 Mobile: 320px - 768px
- 📱 Tablet: 768px - 1024px
- 🖥️ Desktop: 1024px+

## 📈 Future Enhancements

- [ ] Historical performance charts
- [ ] Player statistics & profiles
- [ ] Game comparison tools
- [ ] Export data to CSV/PDF
- [ ] Alert system for significant changes
- [ ] User preferences & settings
- [ ] Dark/Light theme toggle
- [ ] Mobile native app
- [ ] Real-time notifications
- [ ] Advanced analytics

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Dashboard not loading | Ensure all files (HTML, CSS, JS) are in same directory |
| Data not updating | Check browser console for errors (F12) |
| Styling looks broken | Clear browser cache (Ctrl+Shift+Delete) |
| Search not working | Make sure JavaScript is enabled |
| GitHub Pages not working | Check Pages settings: Settings → Pages → Deploy from main |

## 📝 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 60+ | ✅ Fully Supported |
| Firefox | 55+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |
| IE 11 | Any | ❌ Not Supported |

## ⚡ Performance Tips

- Uses CSS Grid & Flexbox for optimal layout performance
- Minimal DOM manipulation for fast updates
- Debounced search functionality
- Optimized animations (60fps)
- No external dependencies = faster loading

## 📜 License

This project is open source and free to use. Feel free to modify and distribute!

## 🤝 Contributing

Found a bug or have an idea? 
1. Create an issue
2. Fork the repository
3. Submit a pull request

## 📞 Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Check existing issues first
- Provide detailed description of the problem

## 👨‍💻 Author

Created by **Jess179** - Arena Plus Tracker
- GitHub: [@Jess179](https://github.com/Jess179)
- Date: June 2026

---

### 🎮 Ready to Track? 
Just open `index.html` and start monitoring your game performance in real-time!

**Last Updated**: June 3, 2026  
**Status**: ✅ Active & Maintained

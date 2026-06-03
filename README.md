# Jili Tracker

A comprehensive winning and losing time tracker application for monitoring gaming sessions, statistics, and performance metrics.

## Features

- ✅ **Session Logging** - Log wins and losses with automatic timestamps
- ⏱️ **Time Tracking** - Monitor session duration and play time
- 📊 **Statistics Dashboard** - View win/loss ratios, streaks, and trends
- 📈 **Visual Analytics** - Charts and graphs for performance analysis
- 💾 **Data Management** - Export and import session data
- 🎯 **Session History** - Complete record of all gaming sessions
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend:** React.js with Vite
- **Backend:** Node.js with Express
- **Database:** SQLite (local storage)
- **Styling:** Tailwind CSS
- **State Management:** Context API

## Project Structure

```
jili-tracker/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── backend/                  # Node.js/Express API
│   ├── routes/               # API routes
│   ├── controllers/          # Request handlers
│   ├── models/               # Data models
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Jess179/jili-tracker.git
cd jili-tracker

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage Guide

### Creating a Session
1. Click "Start Session" button
2. Session timer starts automatically

### Logging Results
- Click "Win" or "Loss" button as games progress
- Timestamp is recorded automatically
- View real-time statistics

### Viewing Statistics
- Dashboard shows win/loss ratio
- View total wins and losses
- Check active sessions
- Analyze trends over time

## API Endpoints

### Sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/:id` - Get session details
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

### Results
- `POST /api/results` - Log win/loss
- `GET /api/results/:sessionId` - Get session results
- `DELETE /api/results/:id` - Delete result

### Statistics
- `GET /api/stats` - Get overall statistics
- `GET /api/stats/period/:period` - Get stats for time period (today/week/month)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Happy tracking! 🎮📊**

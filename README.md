# 📊 Stock Portfolio Tracker

A full-stack web application for managing and tracking stock portfolios in real-time with price alerts, financial news, and interactive analytics.

![Live Demo](https://img.shields.io/badge/demo-live-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.x-61dafb)

**🔗 Live Demo:** [stock-portfolio-ten.vercel.app](https://stock-portfolio-ten.vercel.app)

---

## 🌟 Features

### 📈 Portfolio Management
- **Real-time Stock Tracking** - Monitor your investments with live price updates
- **Interactive Charts** - Visualize portfolio composition with pie charts and performance trends
- **Portfolio History** - Track your portfolio value over time
- **Stock Management** - Add/remove stocks with quantity and average price tracking

### 🔔 Price Alerts
- **Custom Alert System** - Set price targets for specific stocks
- **Alert Monitoring** - Automatic price checking against your defined thresholds
- **Notifications** - Get notified when price targets are triggered
- **Flexible Thresholds** - Set "above" or "below" price alerts

### 📰 Financial News
- **Real-time News Feed** - Stay updated with latest company news
- **Stock Search** - Search and discover stock symbols
- **Company-specific News** - Filter news by stock symbol

### 🎨 User Experience
- **Authentication** - Secure user registration and login
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes for comfortable viewing
- **Intuitive Dashboard** - Easy navigation with clean Material-UI interface

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Material-UI](https://img.shields.io/badge/Material--UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=chart.js&logoColor=white)

- **React.js** - Component-based UI framework
- **Material-UI (MUI)** - Modern React component library
- **React Router** - Client-side routing
- **Recharts** - Data visualization library
- **Axios** - HTTP client for API requests

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

- **Node.js & Express.js** - RESTful API server
- **MongoDB & Mongoose** - NoSQL database
- **JWT** - Authentication & authorization
- **bcrypt** - Password encryption
- **dotenv** - Environment variable management

### APIs
- **Finnhub API** - Real-time stock quotes and news
- **Alpha Vantage API** - Stock market data

---

## 📁 Project Structure

```
Stock-Portfolio/
├── backend/
│   ├── controllers/        # Request handlers
│   │   ├── authController.js
│   │   ├── portfolioController.js
│   │   └── alertsController.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.js
│   ├── models/            # MongoDB schemas
│   │   ├── User.js
│   │   └── PortfolioHistory.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── portfolio.js
│   │   ├── alerts.js
│   │   └── news.js
│   ├── utils/             # Utility functions
│   │   ├── finnhub.js
│   │   └── alphaVantage.js
│   ├── .env               # Environment variables
│   ├── server.js          # Express server
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   └── Navbar.js
│   │   ├── pages/         # Page components
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── PortfolioPage.js
│   │   │   ├── AlertsPage.js
│   │   │   ├── NewsPage.js
│   │   │   └── AboutPage.js
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── utils/         # Utility functions
│   │   │   └── PrivateRoute.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Finnhub API Key** ([Get it here](https://finnhub.io/))
- **Alpha Vantage API Key** ([Get it here](https://www.alphavantage.co/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rahul-VP/Stock-Portfolio.git
   cd Stock-Portfolio
   ```

2. **Install root dependencies** (if any)
   ```bash
   npm install
   ```

3. **Set up Backend**
   ```bash
   cd backend
   npm install
   ```

4. **Configure Backend Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   FINNHUB_API_KEY=your_finnhub_api_key
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
   ```

5. **Set up Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Configure Frontend Environment Variables**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

---

## 💻 Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   # App runs on http://localhost:3000
   ```

3. **Access the Application**
   
   Open your browser and navigate to `http://localhost:3000`

### Production Build

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**
   - Frontend: Deploy the `build` folder to Vercel, Netlify, or any static hosting
   - Backend: Deploy to Heroku, Railway, Render, or any Node.js hosting

---

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Portfolio
- `GET /api/portfolio` - Get user's portfolio (protected)
- `POST /api/portfolio/add` - Add stock to portfolio (protected)
- `POST /api/portfolio/remove` - Remove stock from portfolio (protected)
- `GET /api/portfolio/history` - Get portfolio value history (protected)

### Alerts
- `GET /api/alerts` - Get user's alerts (protected)
- `POST /api/alerts/add` - Add new alert (protected)
- `POST /api/alerts/remove` - Remove alert (protected)
- `GET /api/alerts/check` - Check and trigger alerts (protected)

### News
- `GET /api/news/:symbol` - Get news for a stock symbol (protected)
- `GET /api/news/search/:query` - Search stock symbols (protected)

---

## 📊 Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  portfolio: [{
    symbol: String,
    quantity: Number,
    avgPrice: Number
  }],
  alerts: [{
    symbol: String,
    targetPrice: Number,
    direction: String (enum: ['above', 'below']),
    triggered: Boolean
  }],
  timestamps: true
}
```

### Portfolio History Model
```javascript
{
  user: ObjectId (ref: 'User'),
  date: String (YYYY-MM-DD),
  value: Number,
  timestamps: true
}
```

---

## 🎨 Screenshots

### Dashboard
> Displays portfolio overview, charts, and key metrics

### Portfolio Management
> Add/remove stocks and view holdings

### Price Alerts
> Set and manage price alerts for stocks

### News Feed
> Stay updated with latest financial news

---

## 🔧 Configuration

### CORS Setup
The backend is configured to allow requests from:
- `http://localhost:3000` (development)
- `https://stock-portfolio-ten.vercel.app` (production)

Update `backend/server.js` to add more allowed origins if needed.

### API Rate Limits
- **Finnhub:** Free tier allows 60 API calls/minute
- **Alpha Vantage:** Free tier allows 5 API calls/minute

Consider implementing caching or upgrading to premium tiers for production use.

---

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ Environment variable security
- ✅ CORS configuration
- ✅ Input validation

---

## 🚧 Future Enhancements

- [ ] Real-time WebSocket updates for stock prices
- [ ] Email notifications for price alerts
- [ ] Advanced portfolio analytics (Sharpe ratio, beta, etc.)
- [ ] Transaction history tracking
- [ ] Dividend tracking
- [ ] Multi-currency support
- [ ] Export portfolio data to CSV/PDF
- [ ] Social features (share portfolios)
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rahul VP**

- GitHub: [@Rahul-VP](https://github.com/Rahul-VP)
- Project Link: [https://github.com/Rahul-VP/Stock-Portfolio](https://github.com/Rahul-VP/Stock-Portfolio)

---

## 🙏 Acknowledgments

- [Finnhub](https://finnhub.io/) - Stock market API
- [Alpha Vantage](https://www.alphavantage.co/) - Financial data API
- [Material-UI](https://mui.com/) - React component library
- [Recharts](https://recharts.org/) - Charting library
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Frontend hosting

---

## 📞 Support

If you have any questions or need help, please open an issue in the [GitHub repository](https://github.com/Rahul-VP/Stock-Portfolio/issues).

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

<p align="center">Made with ❤️ by Rahul VP</p>

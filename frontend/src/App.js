import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PortfolioPage from './pages/PortfolioPage';
import AlertsPage from './pages/AlertsPage';
import NewsPage from './pages/NewsPage';
import AboutPage from './pages/AboutPage';
import Fade from '@mui/material/Fade';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const [mode, setMode] = useState('light');
  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#43a047',
      },
      background: {
        default: mode === 'light' ? '#f4f6f8' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<Fade in timeout={400}><div><AboutPage toggleMode={toggleMode} mode={mode} /></div></Fade>} />
          <Route path="/" element={<PrivateRoute><Fade in timeout={400}><div><DashboardPage toggleMode={toggleMode} mode={mode} /></div></Fade></PrivateRoute>} />
          <Route path="/portfolio" element={<PrivateRoute><Fade in timeout={400}><div><PortfolioPage toggleMode={toggleMode} mode={mode} /></div></Fade></PrivateRoute>} />
          <Route path="/alerts" element={<PrivateRoute><Fade in timeout={400}><div><AlertsPage toggleMode={toggleMode} mode={mode} /></div></Fade></PrivateRoute>} />
          <Route path="/news" element={<PrivateRoute><Fade in timeout={400}><div><NewsPage toggleMode={toggleMode} mode={mode} /></div></Fade></PrivateRoute>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 
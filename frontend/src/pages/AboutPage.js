import React from 'react';
import Navbar from '../components/Navbar';
import { Box, Card, CardContent, Typography } from '@mui/material';

function AboutPage({ toggleMode, mode }) {
  return (
    <>
      <Navbar toggleMode={toggleMode} mode={mode} />
      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" fontWeight={700} gutterBottom>About Stock Portfolio Tracker</Typography>
            <Typography variant="body1" paragraph>
              <b>Stock Portfolio Tracker</b> helps you track your investments in stocks and mutual funds, visualize your portfolio, and stay updated with the latest news. Set price alerts, view gain/loss, and enjoy a secure, modern experience.
            </Typography>
            <Typography variant="h6" gutterBottom>Features:</Typography>
            <ul>
              <li>Secure login with JWT authentication</li>
              <li>Add, remove, and track stocks and funds</li>
              <li>Real-time price updates and gain/loss calculation</li>
              <li>Price alerts for your holdings</li>
              <li>Interactive charts and data visualization</li>
              <li>Latest news for your portfolio</li>
              <li>Modern, responsive UI with light/dark mode</li>
            </ul>
            <Typography variant="h6" gutterBottom>Technologies Used:</Typography>
            <ul>
              <li>React & Material-UI (frontend)</li>
              <li>Node.js, Express, MongoDB (backend)</li>
              <li>Alpha Vantage API for stock data</li>
              <li>JWT for authentication</li>
            </ul>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default AboutPage; 
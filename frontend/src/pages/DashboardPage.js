import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent, Typography, Grid, Paper, Box, CircularProgress, Avatar, Chip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartIcon from '@mui/icons-material/PieChart';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HistoryIcon from '@mui/icons-material/History';

const COLORS = ['#1976d2', '#43a047', '#FFBB28', '#FF8042', '#A28CFF', '#FF6699', '#33CC99'];

function DashboardPage({ toggleMode, mode }) {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]); // For demo, static or empty
  const [user, setUser] = useState({ username: 'User' });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/auth/me');
        setUser(res.data);
      } catch (err) {}
    };
    fetchUser();
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/portfolio');
        setPortfolio(res.data.portfolio);
        // Fetch real history
        try {
          const histRes = await api.get('/api/portfolio/history');
          if (histRes.data && histRes.data.length > 0) {
            setHistory(histRes.data.map(h => ({ date: h.date, value: h.value })));
          } else {
            // fallback to demo
            const today = new Date();
            const totalValue = res.data.portfolio.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
            const demoHistory = Array.from({ length: 7 }).map((_, i) => ({
              date: new Date(today.getTime() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
              value: Math.round(totalValue * (0.95 + Math.random() * 0.1)),
            }));
            setHistory(demoHistory);
          }
        } catch (err) {
          // fallback to demo
          const today = new Date();
          const totalValue = res.data.portfolio.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
          const demoHistory = Array.from({ length: 7 }).map((_, i) => ({
            date: new Date(today.getTime() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            value: Math.round(totalValue * (0.95 + Math.random() * 0.1)),
          }));
          setHistory(demoHistory);
        }
      } catch (err) {
        setError('Failed to fetch portfolio');
      }
      setLoading(false);
    };
    const fetchAlerts = async () => {
      try {
        const res = await api.get('/api/alerts');
        setAlerts(res.data.alerts);
      } catch (err) {}
    };
    fetchPortfolio();
    fetchAlerts();
  }, []);

  const totalValue = portfolio.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  const totalGainLoss = portfolio.reduce((sum, item) => sum + Number(item.gainLoss), 0);
  const numHoldings = portfolio.length;
  const numAlerts = alerts.length;
  const recentActivity = [
    ...(portfolio.length ? [{
      type: 'Stock Added',
      detail: `${portfolio[portfolio.length-1].symbol} (${portfolio[portfolio.length-1].quantity} shares)`,
      icon: <PieChartIcon color="primary" />,
    }] : []),
    ...(alerts.length ? [{
      type: 'Alert Set',
      detail: `${alerts[alerts.length-1].symbol} ${alerts[alerts.length-1].direction} ${alerts[alerts.length-1].targetPrice}`,
      icon: <NotificationsActiveIcon color="secondary" />,
    }] : []),
  ];

  return (
    <>
      <Navbar toggleMode={toggleMode} mode={mode} />
      <Box sx={{ p: { xs: 1, sm: 3 }, maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center', gap: 2, boxShadow: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <PersonIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>Welcome{user.username ? `, ${user.username}` : ''}!</Typography>
                <Typography variant="body1" color="text.secondary">Track your investments, set alerts, and visualize your portfolio in one place.</Typography>
              </Box>
            </Card>
          </Grid>
          {/* Summary Cards */}
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}><AttachMoneyIcon /></Avatar>
              <Typography variant="subtitle2">Total Value</Typography>
              <Typography variant="h6" fontWeight={700}>${totalValue.toFixed(2)}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 2 }}>
              <Avatar sx={{ bgcolor: totalGainLoss >= 0 ? 'success.main' : 'error.main', mb: 1 }}><TrendingUpIcon /></Avatar>
              <Typography variant="subtitle2">Total Gain/Loss</Typography>
              <Typography variant="h6" fontWeight={700} sx={{ color: totalGainLoss >= 0 ? 'success.main' : 'error.main' }}>{totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 2 }}>
              <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }}><PieChartIcon /></Avatar>
              <Typography variant="subtitle2">Holdings</Typography>
              <Typography variant="h6" fontWeight={700}>{numHoldings}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 2 }}>
              <Avatar sx={{ bgcolor: 'info.main', mb: 1 }}><NotificationsActiveIcon /></Avatar>
              <Typography variant="subtitle2">Alerts</Typography>
              <Typography variant="h6" fontWeight={700}>{numAlerts}</Typography>
            </Card>
          </Grid>
          {/* Charts */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, boxShadow: 1 }}>
              <Typography variant="subtitle1" gutterBottom>Holdings Breakdown</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={portfolio} dataKey="currentPrice" nameKey="symbol" cx="50%" cy="50%" outerRadius={80} label>
                    {portfolio.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: '100%', boxShadow: 1 }}>
              <Typography variant="subtitle1" gutterBottom>Portfolio Value Over Time</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={history}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#1976d2" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          {/* Recent Activity */}
          <Grid item xs={12}>
            <Card sx={{ mt: 2, p: 2, boxShadow: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <HistoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" fontWeight={700}>Recent Activity</Typography>
              </Box>
              {recentActivity.length === 0 ? (
                <Typography color="text.secondary">No recent activity yet.</Typography>
              ) : (
                recentActivity.map((activity, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {activity.icon}
                    <Chip label={activity.type} color="primary" size="small" sx={{ mx: 1 }} />
                    <Typography>{activity.detail}</Typography>
                  </Box>
                ))
              )}
            </Card>
          </Grid>
        </Grid>
        {loading && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}><CircularProgress color="primary" /></Box>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && portfolio.length === 0 && (
          <Typography sx={{ mt: 4, textAlign: 'center' }}>Your portfolio is empty. Add stocks to see summary and charts.</Typography>
        )}
      </Box>
    </>
  );
}

export default DashboardPage; 
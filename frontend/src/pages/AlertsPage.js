import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Box, Card, CardContent, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Alert, Select, MenuItem, CircularProgress, Snackbar, Avatar, Chip } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function AlertsPage({ toggleMode, mode }) {
  const [alerts, setAlerts] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [direction, setDirection] = useState('above');
  const [error, setError] = useState('');
  const [triggered, setTriggered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const ALERTS_ACCENT = '#fb923c'; // Orange

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/alerts');
      setAlerts(res.data.alerts);
    } catch (err) {
      setError('Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/alerts/add', { symbol: symbol.toUpperCase(), targetPrice: Number(targetPrice), direction });
      setSymbol(''); setTargetPrice(''); setDirection('above');
      fetchAlerts();
      setSnackbar({ open: true, message: 'Alert added!', severity: 'success' });
    } catch (err) {
      setError('Failed to add alert');
      setSnackbar({ open: true, message: 'Failed to add alert', severity: 'error' });
    }
  };

  const handleRemove = async (alert) => {
    setError('');
    try {
      await api.post('/api/alerts/remove', alert);
      fetchAlerts();
      setSnackbar({ open: true, message: 'Alert removed!', severity: 'success' });
    } catch (err) {
      setError('Failed to remove alert');
      setSnackbar({ open: true, message: 'Failed to remove alert', severity: 'error' });
    }
  };

  const handleCheck = async () => {
    setError('');
    try {
      const res = await api.get('/api/alerts/check');
      setTriggered(res.data.triggered);
      fetchAlerts();
      setSnackbar({ open: true, message: 'Checked alerts!', severity: 'success' });
    } catch (err) {
      setError('Failed to check alerts');
      setSnackbar({ open: true, message: 'Failed to check alerts', severity: 'error' });
    }
  };

  return (
    <>
      <Navbar toggleMode={toggleMode} mode={mode} />
      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1, sm: 3 } }}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: 24, sm: 32 } }}>Alerts</Typography>
        <Card sx={{ mb: 3, p: { xs: 1, sm: 2 }, display: 'flex', alignItems: 'center', gap: 2, boxShadow: 2 }}>
          <Avatar sx={{ bgcolor: ALERTS_ACCENT, width: 40, height: 40 }}><NotificationsActiveIcon /></Avatar>
          <Box>
            <Typography variant="subtitle2">Total Alerts</Typography>
            <Typography variant="h6" fontWeight={700} sx={{ color: ALERTS_ACCENT }}>{alerts.length}</Typography>
            <Chip label={`Triggered: ${alerts.filter(a => a.triggered).length}`} sx={{ ml: 1, bgcolor: ALERTS_ACCENT, color: '#fff' }} icon={<TrendingUpIcon />} />
          </Box>
        </Card>
        <Card sx={{ mb: 3, p: { xs: 1, sm: 2 }, boxShadow: 2 }}>
          <CardContent>
            <Box component="form" onSubmit={handleAdd} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <TextField label="Symbol" value={symbol} onChange={e => setSymbol(e.target.value)} required sx={{ minWidth: 100, flex: 1 }} />
              <TextField label="Target Price" type="number" value={targetPrice} onChange={e => setTargetPrice(e.target.value)} required sx={{ minWidth: 100, flex: 1 }} />
              <Select value={direction} onChange={e => setDirection(e.target.value)} sx={{ minWidth: 100, flex: 1 }}>
                <MenuItem value="above">Above</MenuItem>
                <MenuItem value="below">Below</MenuItem>
              </Select>
              <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 100 }}>Add Alert</Button>
            </Box>
            <Button onClick={handleCheck} variant="outlined" color="secondary" sx={{ mb: 2 }}>Check Alerts</Button>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}><CircularProgress color="primary" /></Box> : (
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><AttachMoneyIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />Symbol</TableCell>
                      <TableCell>Target Price</TableCell>
                      <TableCell>Direction</TableCell>
                      <TableCell>Triggered</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alerts.map((alert, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{alert.symbol}</TableCell>
                        <TableCell>{alert.targetPrice}</TableCell>
                        <TableCell>{alert.direction}</TableCell>
                        <TableCell>
                          <Chip label={alert.triggered ? 'Yes' : 'No'} color={alert.triggered ? 'success' : 'warning'} size="small" />
                        </TableCell>
                        <TableCell><Button color="secondary" variant="outlined" onClick={() => handleRemove(alert)}>Remove</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
            {triggered.length > 0 && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                <b>Triggered Alerts:</b>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {triggered.map((a, i) => (
                    <li key={i}>{a.symbol} {a.direction} {a.targetPrice} (Current: {a.currentPrice})</li>
                  ))}
                </ul>
              </Alert>
            )}
          </CardContent>
        </Card>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          ContentProps={{
            style: { backgroundColor: snackbar.severity === 'success' ? '#43a047' : '#d32f2f', color: '#fff' },
          }}
        />
      </Box>
    </>
  );
}

export default AlertsPage; 
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import { Box, Card, CardContent, Typography, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Alert, CircularProgress, Snackbar, Avatar, Chip, Tooltip, Autocomplete } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function PortfolioPage({ toggleMode, mode }) {
  const [portfolio, setPortfolio] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [symbolOptions, setSymbolOptions] = useState([]);
  const [symbolLoading, setSymbolLoading] = useState(false);

  const PORTFOLIO_ACCENT = '#7c3aed'; // Deep purple

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/portfolio');
      setPortfolio(res.data.portfolio);
    } catch (err) {
      setError('Failed to fetch portfolio');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/portfolio/add', { symbol: symbol.toUpperCase(), quantity: Number(quantity), avgPrice: Number(avgPrice) });
      setSymbol(''); setQuantity(''); setAvgPrice('');
      fetchPortfolio();
      setSnackbar({ open: true, message: 'Stock added!', severity: 'success' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add stock');
      setSnackbar({ open: true, message: err.response?.data?.msg || 'Failed to add stock', severity: 'error' });
    }
  };

  const handleRemove = async (symbol) => {
    setError('');
    try {
      await api.post('/api/portfolio/remove', { symbol });
      fetchPortfolio();
      setSnackbar({ open: true, message: 'Stock removed!', severity: 'success' });
    } catch (err) {
      setError('Failed to remove stock');
      setSnackbar({ open: true, message: 'Failed to remove stock', severity: 'error' });
    }
  };

  const handleSymbolInput = async (event, value) => {
    setSymbol(value);
    if (value && value.length >= 2) {
      setSymbolLoading(true);
      try {
        const res = await api.get(`/api/news/search/${value}`);
        setSymbolOptions(res.data.map(opt => ({ label: `${opt.symbol} (${opt.description})`, value: opt.symbol })));
      } catch (err) {
        setSymbolOptions([]);
      }
      setSymbolLoading(false);
    } else {
      setSymbolOptions([]);
    }
  };

  const totalValue = portfolio.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  const totalGainLoss = portfolio.reduce((sum, item) => sum + Number(item.gainLoss), 0);

  return (
    <>
      <Navbar toggleMode={toggleMode} mode={mode} />
      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 1, sm: 3 } }}>
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: 24, sm: 32 } }}>Portfolio</Typography>
        <Card sx={{ mb: 3, p: { xs: 1, sm: 2 }, display: 'flex', alignItems: 'center', gap: 2, boxShadow: 2 }}>
          <Avatar sx={{ bgcolor: PORTFOLIO_ACCENT, width: 40, height: 40 }}><PieChartIcon /></Avatar>
          <Box>
            <Typography variant="subtitle2">Total Value</Typography>
            <Typography variant="h6" fontWeight={700} sx={{ color: PORTFOLIO_ACCENT }}>${totalValue.toFixed(2)}</Typography>
            <Chip label={`Gain/Loss: ${totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toFixed(2)}`} sx={{ ml: 1, bgcolor: PORTFOLIO_ACCENT, color: '#fff' }} icon={<TrendingUpIcon />} />
          </Box>
        </Card>
        <Card sx={{ mb: 3, p: { xs: 1, sm: 2 }, boxShadow: 2 }}>
          <CardContent>
            <Box component="form" onSubmit={handleAdd} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Autocomplete
                freeSolo
                options={symbolOptions}
                loading={symbolLoading}
                inputValue={symbol}
                onInputChange={handleSymbolInput}
                onChange={(e, value) => setSymbol(value?.value || value || '')}
                renderInput={(params) => (
                  <TextField {...params} label="Symbol" required sx={{ minWidth: 100, flex: 1 }} />
                )}
              />
              <TextField label="Quantity" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required sx={{ minWidth: 100, flex: 1 }} />
              <TextField label="Avg Price" type="number" value={avgPrice} onChange={e => setAvgPrice(e.target.value)} required sx={{ minWidth: 100, flex: 1 }} />
              <Button type="submit" variant="contained" color="primary" sx={{ minWidth: 100 }}>Add Stock</Button>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}><CircularProgress color="primary" /></Box> : (
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><AttachMoneyIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />Symbol</TableCell>
                      <TableCell><PieChartIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />Quantity</TableCell>
                      <TableCell>Avg Price</TableCell>
                      <TableCell>Current Price</TableCell>
                      <TableCell><TrendingUpIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />Gain/Loss</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolio.map(item => (
                      <TableRow key={item.symbol} hover>
                        <TableCell>{item.symbol}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.avgPrice}</TableCell>
                        <TableCell>{item.currentPrice}</TableCell>
                        <TableCell>
                          {item.currentPrice === item.avgPrice ? (
                            <Tooltip title="Real-time price unavailable, using average price.">
                              <Chip label={item.gainLoss} color="warning" size="small" />
                            </Tooltip>
                          ) : (
                            <Chip label={item.gainLoss} color={item.gainLoss >= 0 ? 'success' : 'error'} size="small" />
                          )}
                        </TableCell>
                        <TableCell><Button color="secondary" variant="outlined" onClick={() => handleRemove(item.symbol)}>Remove</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
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

export default PortfolioPage; 
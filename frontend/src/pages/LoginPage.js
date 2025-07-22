import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import api from './services/api';
import { Box, Card, CardContent, TextField, Button, Typography, Alert, Snackbar } from '@mui/material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
      setSnackbar({ open: true, message: err.response?.data?.msg || 'Login failed', severity: 'error' });
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      background: `linear-gradient(rgba(25, 118, 210, 0.7), rgba(67, 160, 71, 0.7)), url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat`,
    }}>
      <Card sx={{ maxWidth: 400, width: '100%', p: 2, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>Login</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required fullWidth />
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
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
  );
}

export default LoginPage; 

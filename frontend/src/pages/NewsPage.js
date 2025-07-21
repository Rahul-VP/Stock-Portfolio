import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Box, Card, CardContent, Typography, Avatar, Link as MuiLink, CircularProgress } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import api from '../services/api';

function NewsPage({ toggleMode, mode }) {
  const [newsBySymbol, setNewsBySymbol] = useState({});
  const [loading, setLoading] = useState(true);
  const NEWS_ACCENT = '#06b6d4'; // Teal

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const portfolioRes = await api.get('/api/portfolio');
        const symbols = portfolioRes.data.portfolio.map(item => item.symbol);
        const newsResults = {};
        for (const symbol of symbols) {
          try {
            const res = await api.get(`/api/news/${symbol}`);
            newsResults[symbol] = res.data;
          } catch (err) {
            newsResults[symbol] = [];
          }
        }
        setNewsBySymbol(newsResults);
      } catch (err) {
        setNewsBySymbol({});
      }
      setLoading(false);
    };
    fetchAllNews();
  }, []);

  return (
    <>
      <Navbar toggleMode={toggleMode} mode={mode} />
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Card sx={{ mb: 3, p: 2, display: 'flex', alignItems: 'center', gap: 2, boxShadow: 2 }}>
          <Avatar sx={{ bgcolor: NEWS_ACCENT, width: 48, height: 48 }}><NewspaperIcon fontSize="large" /></Avatar>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: NEWS_ACCENT }}>News</Typography>
            <Typography color="text.secondary">Latest news for your portfolio holdings</Typography>
          </Box>
        </Card>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}><CircularProgress color="primary" /></Box>
        ) : Object.keys(newsBySymbol).length === 0 ? (
          <Card sx={{ mb: 2, p: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={700}>No news available</Typography>
            <Typography color="text.secondary">No recent news found for your portfolio stocks.</Typography>
          </Card>
        ) : (
          Object.entries(newsBySymbol).map(([symbol, news]) => (
            <Box key={symbol} sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>{symbol}</Typography>
              {news.length === 0 ? (
                <Typography color="text.secondary">No news for this stock.</Typography>
              ) : (
                news.map((item, idx) => (
                  <Card key={idx} sx={{ mb: 2, p: 2, boxShadow: 1 }}>
                    <Typography variant="h6" fontWeight={700}>{item.headline}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>{item.summary}</Typography>
                    <MuiLink href={item.url} target="_blank" rel="noopener" underline="hover">Read more</MuiLink>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>{new Date(item.datetime).toLocaleString()}</Typography>
                  </Card>
                ))
              )}
            </Box>
          ))
        )}
      </Box>
    </>
  );
}

export default NewsPage; 
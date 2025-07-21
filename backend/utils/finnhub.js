const axios = require('axios');
const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

exports.getStockNews = async (symbol) => {
  const today = new Date();
  const from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString().slice(0, 10);
  const to = today.toISOString().slice(0, 10);
  const url = `${BASE_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

exports.getStockQuote = async (symbol) => {
  const url = `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

exports.searchSymbols = async (query) => {
  const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&token=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.result;
}; 
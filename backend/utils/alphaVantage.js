const axios = require('axios');

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

exports.getStockQuote = async (symbol) => {
  const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data['Global Quote'];
};

exports.getNews = async (symbol) => {
  // Alpha Vantage news API is premium; for demo, return empty or mock
  return [];
}; 
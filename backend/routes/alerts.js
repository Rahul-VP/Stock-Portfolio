const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAlerts, addAlert, removeAlert, checkAlerts } = require('../controllers/alertsController');

// Alerts routes will be added here
router.get('/', auth, getAlerts);
router.post('/add', auth, addAlert);
router.post('/remove', auth, removeAlert);
router.get('/check', auth, checkAlerts);

module.exports = router; 
const express = require('express');
const router = express.Router();
const { receiveContact } = require('../controllers/contactController');
const ApiRateLimiter = require('../middlewares/apiRate');

router.post('/', receiveContact);

module.exports = router;
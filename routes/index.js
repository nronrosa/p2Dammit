const path = require('path');
const router = require('express').Router();
const apiConfessionRoute = require('./confession-api-routes');
const apiUserRoute = require('./user-api-routes');

// ***********************************
router.use('/api', apiUserRoute);
router.use('/api', apiConfessionRoute);

module.exports = router;
/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const express = require('express');
const imageRoutes = require('./routes/v1/image.route');

const router = express.Router();

/**
 * GET /status - Check server status
 */
router.get('/status', (req, res) => res.status(200).json({ message: 'OK' }));

/**
 * Mount images routes at /images
 */
router.use('/images', imageRoutes);

module.exports = router;

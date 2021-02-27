const express = require('express');
const router = express.Router();
const shortUrl = require('../controllers/shorturl');

/**
 * @route   GET /api/shorturl/
 * @desc    root of shorturl route
 * @access  Public
 */

router.get('/', (req, res) => {
    res.send("we're in route short url");
});


/**
 * @route   POST /api/shorturl/new
 * @desc    Create a new record and returns shortend url to client
 * @access  Public
 */

router.post('/new', (req, res) => {
    shortUrl.createShortUrl(req, res);
});


/**
 * @route   GET /api/shorturl/:url
 * @desc    redirects to the actual url when given a shortend one
 * @access  Public
 */

router.get('/:url', (req, res) => {
    shortUrl.redirectToUrl(req, res);
});



module.exports = router;

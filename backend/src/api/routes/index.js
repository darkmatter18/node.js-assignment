/**
 * @file router.js
 * @description This file contains root lavel routing rules
 * @author Arkadip Bhattacharya(@darkmatter18)
 */

const express = require('express');

const authRouter = require('./auth.route')


const router = express.Router();

router.get('/status', (req, res)=> res.send("OK! I'm live"));

/**
 * Adding router
 * @prefix /api
 */
router.use('/auth', authRouter);

module.exports = router;
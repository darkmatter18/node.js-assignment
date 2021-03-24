/**
 * @file router.js
 * @description This file contains root lavel routing rules
 * @author Arkadip Bhattacharya(@darkmatter18)
 */

const express = require('express');


const router = express.Router();

router.get('/status', (req, res)=> res.send("OK! I'm live"));


module.exports = router;
const express = require('express')
const path = require('path');

const router = express.Router();

const r = (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
}

router.get('/', r);
router.get('/login', r);
router.get('/register', r);
router.get('/forgot', r);
router.get('/dashboard', r);
router.get('/blogs', r);
router.get('/blog/new', r);



module.exports = { clientRouter: router, static: express.static(path.join(__dirname, '/build')) };

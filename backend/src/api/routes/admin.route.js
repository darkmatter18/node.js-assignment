const express = require('express')
const { authorize, ADMIN } = require('./../auth')

const router = express.Router()

const adminController = require('../controllers/admin.controller')

router.route('/blog')
    .get(authorize(ADMIN), adminController.getBlogs)
    .post(authorize(ADMIN))
    .put(authorize(ADMIN))
    .delete(authorize(ADMIN))

router.route('/user')
    .get(authorize(ADMIN))

module.exports = router
const express = require('express');
const { validate } = require('express-validation');
const { postBlog } = require('../validations/user.validation');
const { authorize, ADMIN, LOGGED_USER } = require('./../auth')

const userController = require('./../controllers/user.controller')

const router = express.Router();

router.get('/status', (req, res) => res.send("OK! I'm live from BLOG"));



router.route('/blog')

    .post(authorize(), validate(postBlog), userController.postBlog)

    .get(authorize(), userController.getBlogs)

    .put(authorize(), userController.editBlog)

    .delete(authorize(), userController.deleteBlog)

router.get('/blog/:blogId', authorize(), userController.getsingleBlog)

module.exports = router;
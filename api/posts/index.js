const router = require('express').Router();
const PostsController = require('./posts.controller')
const { checkAuth } = require('../middleware')


router.get('/', checkAuth, PostsController.getAll)


module.exports = router
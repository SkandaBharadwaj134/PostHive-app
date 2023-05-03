const router = require('express').Router();
const PostsController = require('./posts.controller')
const { checkAuth } = require('../middleware')


router.get('/', checkAuth, PostsController.getAll)
router.get('/:id', checkAuth, PostsController.getSingle)

router.post('/', checkAuth, PostsController.insert)
router.put('/:id', checkAuth, PostsController.update)

router.delete('/:id', checkAuth, PostsController.delete)


module.exports = router
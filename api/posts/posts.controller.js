const { PostService } = require('./posts.service')
const postService = new PostService()

class PostsController {
    constructor( ) {

    }
    async getAll(req, res, next) {
        try {
            const response = await postService.getAll(req.user)
            res.send(response)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new PostsController(postService)
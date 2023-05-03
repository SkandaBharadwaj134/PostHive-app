const { PostService } = require('./posts.service')
const postService = new PostService()

class PostsController {
    constructor( ) {

    }
    async getAll(req, res, next) {
        try {
            const response = await postService.getAll(req.query, req.user)
            res.send(response)
        } catch(e) {
            next(e)
        }
    }
    async getSingle(req, res, next) {
        try {
            const { id } = req.params
            const response = await postService.getSingle(id, req.user)
            res.send(response)
        } catch(e) {
            next(e)
        }
    }
    async insert(req, res, next) {
        try {
            const response = await postService.insert(req.body, req.user)
            res.send(response)
        } catch(e) {
            next(e)
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params
            const response = await postService.update(id, req.body, req.user)
            res.send(response)
        } catch(e) {
            next(e)
        }
    }
    async delete(req, res, next) {
        try {
            const { id } = req.params
            const response = await postService.delete(id, req.user)
            res.send(response)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new PostsController(postService)
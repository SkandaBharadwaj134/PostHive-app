const Route = require("express").Router();
const Auth = require("./auth")
const Posts = require("./posts")

Route.get('/', async (req, res) =>{
    res.json({
        message: 'PostHive API works!!'
    })
})

Route.use('/auth', Auth)
Route.use('/posts', Posts)


module.exports = Route
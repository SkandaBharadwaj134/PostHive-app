const Route = require("express").Router();
const Auth = require("./auth")
const Posts = require("./posts")
const Articles = require('./articles')
Route.get('/', async (req, res) =>{
    res.json({
        message: 'PostHive API works!!'
    })
})

Route.use('/auth', Auth)
Route.use('/posts', Posts)
Route.use('/articles', Articles)


module.exports = Route
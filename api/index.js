const Route = require("express").Router();

Route.get('/', async (req, res) =>{
    res.json({
        message: 'PostHive API works!!'
    })
})

module.exports = Route
const { AuthService } = require('./auth.service')
const authService = new AuthService()

class AuthController {
    constructor( ) {

    }
    async login(req, res, next) {
        try {
            const response = await authService.login( req.body )
            res.send(response)
        } catch(e) {
            next(e)
        }
    }

    async register(req, res, next) {
        try {
            const response = await authService.register( req.body )
            res.send(response)
        } catch(e) {
            next(e)
        }
    }
    async verifyOTP(req, res, next) {
        try {
            const response = await authService.verifyOTP( req.body )
            res.send(response)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new AuthController(authService)
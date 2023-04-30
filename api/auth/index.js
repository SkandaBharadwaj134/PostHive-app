const router = require('express').Router();
const AuthController = require('./auth.controller')

router.post('/otp-login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/otp-verify', AuthController.verifyOTP)

module.exports = router
const { Router } = require('express')
const { check } = require('express-validator')
const { getUsers, register, login } = require('../controllers/users')
const { upload } = require('../middleware/uploads')

const router = Router()

router.get(`/`, getUsers)

router.post(`/register`, upload.single('image'), Array(check('username').not().isEmpty(), 
                            check('email').normalizeEmail().isEmail(),
                            check('passcode').isLength({ min:6 })), register).post(`/login`, login)

module.exports = router
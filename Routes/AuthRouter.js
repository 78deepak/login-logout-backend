const { signup, login } = require('../controller/AuthController');
const { signupVallidation, loginVallidation } = require('../middleware/AuthVallidation');
const router = require('express').Router();


router.post('/login',loginVallidation,login)

router.post('/signup',signupVallidation,signup)


module.exports = router;
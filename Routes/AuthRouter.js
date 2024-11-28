const { signup, login,VerfiyEmail } = require('../controller/AuthController');
const { signupVallidation, loginVallidation } = require('../middleware/AuthVallidation');
const router = require('express').Router();


router.post('/login',loginVallidation,login)

router.post('/signup',signupVallidation,signup)
router.post('/VerfiyEmail',VerfiyEmail)


module.exports = router;
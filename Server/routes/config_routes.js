const router = require("express").Router();

const  { login,signup,requestPasswordReset, resetPassword } =require( '../controllers/userController.js');

router.post('/auth/login', login);
router.post('auth/signup', signup);
// Route to request password reset
router.post('/auth/requestPasswordReset', requestPasswordReset);

// Route to reset password
router.post('auth/resetPassword', resetPassword);

module.exports = router;
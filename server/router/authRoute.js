const express = require('express');
const router = express.Router();
const {registerController, loginController} = require('../controller/authController');

router.post('/register', registerController);
// router.get('/login', loginController);
router.post('/login', loginController);

module.exports = router;
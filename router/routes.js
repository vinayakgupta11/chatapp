const express = require('express');
const router= express.Router();
const user = require('../controller/userController.js');
const auth= require('../utility')

router.post('/register', user.registerController);
router.post('/login',  user.loginController);
router.post('/forget',user.forgetController);
router.post('/reset',auth.verify,  user.resetController);
router.get('/dashboard',  user.getUsersController);

module.exports = router;
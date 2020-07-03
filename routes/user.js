const express = require('express');

const userController = require('../controllers/user');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/getUsers', isAuth, userController.getAllUsers);

router.get('/getUser/:userId', isAuth, userController.getUser);

router.get('/getFree', isAuth, userController.getFreeUsers);

router.put('/update/:userId', isAuth, userController.updateUser);

router.delete('/delete/:userId', isAuth, userController.deleteUser);

//router.
module.exports = router;